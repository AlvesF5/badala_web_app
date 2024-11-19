"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { eventDetailschema, eventSectorSchema, eventAddressSchema } from "@/utils/schemas";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import Steps from "@/components/signup/Steps"; // Componente de Steps
import EventDetails from '@/components/events/create/steps/EventDetails';
import AddressDetails from '@/components/events/create/steps/AddressDetails';
import SectorDetails from '@/components/events/create/steps/SectorDetails';

const formTemplate = {
    eventName: "",
    startDate: "",
    endDate: "",
    spaceName: "",
    category: "",
    classification: "",
    eventDescription: "",
    sectors: [
        {
            sectorName: "",
            capacity: 0,
            sectorDescription: "",
            salePrice: 0,
            sectorType: "",
        },
    ],
    cep: "",
    street: "",
    number: "",
    state: "",
    city: "",
    neighborhood: "",
    complement: "",
};

const EventRegistration = () => {
    const [data, setData] = useState(formTemplate);

    const updateFielHandler = (key: any, value: any) => {
        setData((prev) => {
            return { ...prev, [key]: value };
        });
    };

    const steps = ["Info. Básicas", "Setores", "Endereço"];
    const [step, setStep] = useState(1);

    const methods = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(step === 1
            ? eventDetailschema
            : step === 2
                ? eventSectorSchema
                : eventAddressSchema),
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
        setValue,
        getValues,
        control,
        trigger, // Importante para validar manualmente
    } = methods;

    const onSubmit = async (data: any) => {
        if (isValid) {
            const formData = new FormData();

            // Adiciona o banner (ou outro arquivo, se necessário)
            formData.append('bannerEvent', new Blob(['Banner Placeholder'], { type: 'text/plain' }));

            console.log(data)

            // Monta o objeto createEventDTO conforme o exemplo do curl
            const createEventDTO = {
                eventDTO: {
                    name: data.eventDTO.name,
                    startDate: data.eventDTO.startDate,
                    endDate: data.eventDTO.endDate,
                    spaceName: data.eventDTO.spaceName,
                    category: data.eventDTO.category,
                    classification: data.eventDTO.classification,
                },
                sectorDTO: {
                    sectors: data.sectorDTO.sectors.map((sector: any) => ({
                        name: sector.name,
                        capacity: sector.capacity,
                        description: sector.description,
                        salePrice: sector.salePrice,
                        sectorType: sector.sectorType,
                    })),
                },
                addressDTO: {
                    cep: data.addressDTO.cep,
                    street: data.addressDTO.street,
                    number: data.addressDTO.number,
                    state: data.addressDTO.state,
                    city: data.addressDTO.city,
                    neighborhood: data.addressDTO.neighborhood,
                    complement: data.addressDTO.complement,
                },
            };

            // Adiciona o objeto createEventDTO como JSON stringificado
            formData.append('createEventDTO', JSON.stringify(createEventDTO));

            try {
                const response = await fetch('http://localhost:8080/v1/events/create', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    alert('Evento criado com sucesso!');
                } else {
                    alert('Erro ao criar evento');
                }
            } catch (error) {
                console.error('Erro:', error);
            }
        }
    };

    const nextStep = async () => {
        const isStepValid = await trigger(); // Valida o formulário da etapa atual
        if (isStepValid) {
            setStep((prev) => prev + 1);
        }
    };

    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="flex flex-col h-full items-center w-full mt-44 gap-8">
            <Steps currentStep={step} steps={steps} /> {/* Barra de progresso */}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center flex-col items-center">
                    <div className="w-10/12 md:w-4/12">
                        {step === 1 && <EventDetails
                            key="event-details"
                            data={data}
                            updateFielHandler={updateFielHandler}
                            register={register}
                            errors={errors} />}
                        {step === 2 && <SectorDetails key="event-details"
                            data={data}
                            updateFielHandler={updateFielHandler}
                            register={register}
                            errors={errors}
                            control={control} />}
                        {step === 3 && <AddressDetails
                            key="address-details"
                            data={data}
                            updateFielHandler={updateFielHandler}
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues} />}
                    </div>

                    <div className="actions flex flex-row gap-2 mt-3 text-white font-semibold text-md w-10/12 md:w-4/12 justify-end">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="py-3 px-3 bg-balada_violet_500 flex items-center rounded-md uppercase text-sm"
                            >
                                <GrFormPrevious />
                                <span>Voltar</span>
                            </button>
                        )}
                        {step < 3 ? (
                            <button
                                type="button" // Alterado para "button" para evitar submissão prematura
                                onClick={nextStep} // Chama a função que valida antes de avançar
                                className="py-3 px-3 bg-balada_green_900 flex items-center rounded-md uppercase text-sm"
                            >
                                <span>Avançar</span>
                                <GrFormNext />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="py-1 px-4 flex items-center rounded-md uppercase text-sm bg-balada_green_900 text-white"
                            >
                                <span>Enviar</span>
                                <FiSend />
                            </button>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default EventRegistration;