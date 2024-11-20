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
import useMyForms from "@/hooks/useMyForms";
import { toast } from "sonner";

const EventRegistration = () => {
    const steps = ["Info. Básicas", "Setores", "Endereço"];
    const [step, setStep] = useState(0);

    const methods = useForm({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(
            step === 0
                ? eventDetailschema
                : step === 1
                    ? eventSectorSchema
                    : eventAddressSchema
        ),
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
        setValue,
    } = methods;

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

    const [data, setData] = useState(formTemplate);

    const updateFieldHandler = (key: any, value: any) => {
        setData((prev) => {
            return { ...prev, [key]: value };
        });
    };

    // eslint-disable-next-line react/jsx-key
    const formComponents = [
        <EventDetails
            key="event-details"
            data={data}
            updateFielHandler={updateFieldHandler}
            register={register}
            errors={errors}
            setValue={setValue}
        />,
        <SectorDetails
            key="sector-details"
            data={data}
            updateFieldHandler={updateFieldHandler}
            register={register}
            errors={errors}
        />,
        <AddressDetails
            key="address-details"
            data={data}
            updateFieldHandler={updateFieldHandler}
            register={register}
            errors={errors}
            setValue={setValue}
        />,
    ];

    const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useMyForms(formComponents);

    const onSubmit = (data: any, e: any) => {
        changeStep(currentStep + 1, e);
        setStep(currentStep + 1);
    };

    const createEvent = async () => {
        console.log(data.sectors);
        console.log(data.eventName);
        if (isValid) {
            // Monta o objeto createEventDTO conforme o backend espera
            const createEventDTO = {
                eventDTO: {
                    eventName: data.eventName,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    spaceName: data.spaceName,
                    category: data.category,
                    classification: data.classification,
                    eventDescription: data.eventDescription,
                },
                sectorDTO: {
                    sectors: data.sectors.map((sector: any) => ({
                        sectorName: sector.sectorName,
                        capacity: Number(sector.capacity), // Certifique-se de que 'capacity' seja um número
                        sectorDescription: sector.sectorDescription,
                        salePrice: Number(sector.salePrice), // Certifique-se de que 'salePrice' seja um número
                        sectorType: sector.sectorType,
                    })),
                },
                addressDTO: {
                    cep: data.cep,
                    street: data.street,
                    number: data.number,
                    state: data.state,
                    city: data.city,
                    neighborhood: data.neighborhood,
                    complement: data.complement || '',
                },
            };
    
            try {
                const response = await fetch('http://localhost:8080/v1/events/create', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json", // Informa o tipo de conteúdo que está sendo enviado
                    },
                    body: JSON.stringify(createEventDTO),
                });
    
                console.log(JSON.stringify(createEventDTO));
    
                if (!response.ok) {
                    const errorJson = await response.json();
                    const errorMessage = errorJson.errors.join(", ");
                    toast.error(`Erro ao criar evento: ${errorMessage}`);
                }
    
                if (response.ok) {
                    toast.success("Evento criado com sucesso!");
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(`Erro ao criar evento: ${error.message}`);
                } else {
                    console.log("Ocorreu um erro desconhecido");
                }
            }
        }
    };

    return (
        <div className="flex flex-col h-full items-center w-full mt-44 gap-8">
            <Steps currentStep={currentStep} steps={steps} /> {/* Barra de progresso */}
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center flex-col items-center">
                    <div className="w-10/12 md:w-4/12">
                        {currentComponent}
                    </div>

                    <div className="actions flex flex-row gap-2 mt-3 text-white font-semibold text-md w-10/12 md:w-4/12 justify-end">
                        {!isFirstStep && (
                            <button
                                type="button"
                                onClick={() => {
                                    changeStep(currentStep - 1);
                                    setStep(currentStep - 1);
                                }}
                                className="py-3 px-3 bg-balada_violet_500 flex items-center rounded-md uppercase text-sm"
                            >
                                <GrFormPrevious />
                                <span>Voltar</span>
                            </button>
                        )}
                        {!isLastStep ? (
                            <button
                                type="submit"
                                className="py-3 px-3 bg-balada_green_900 flex items-center rounded-md uppercase text-sm"
                            >
                                <span>Avançar</span>
                                <GrFormNext />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                onClick={createEvent}
                                className={`py-1 px-4 flex items-center rounded-md uppercase text-sm ${
                                    isValid
                                        ? "bg-balada_green_900 text-white"
                                        : "bg-red-500 text-white"
                                }`}
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