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
import EventBanner from '@/components/events/create/steps/EventBanner';
import useMyForms from "@/hooks/useMyForms";
import { toast } from "sonner";

const EventRegistration = () => {
    const steps = ["Info. Básicas", "Setores", "Endereço"];
    const [step, setStep] = useState(0);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [eventId, setEventId] = useState<string | null>(null); // Armazena o ID do evento criado
    const [uploadFailed, setUploadFailed] = useState(false); // Indica se o upload do banner falhou

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
        defaultValues: {
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
        },
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
        setValue,
        control
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
            control={control}
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
        <EventBanner onBannerSelect={setBannerFile} />
    ];

    const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useMyForms(formComponents);

    const onSubmit = (data: any, e: any) => {
        changeStep(currentStep + 1, e);
        setStep(currentStep + 1);
    };

    const createEvent = async () => {
        if (isValid) {
            const createEventDTO = {
                eventDTO: {
                    eventName: data.eventName,
                    startDate: new Date(data.startDate).toISOString(),
                    endDate: new Date(data.endDate).toISOString(),
                    spaceName: data.spaceName,
                    category: data.category,
                    classification: data.classification,
                    eventDescription: data.eventDescription,
                },
                sectorDTO: {
                    sectors: data.sectors.map((sector: any) => ({
                        sectorName: sector.sectorName,
                        capacity: Number(sector.capacity),
                        sectorDescription: sector.sectorDescription,
                        salePrice: Number(sector.salePrice),
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
                // Chamada para criar o evento
                const response = await fetch('http://localhost:8080/v1/events/create', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(createEventDTO),
                });

                if (!response.ok) {
                    const errorJson = await response.json();
                    const errorMessage = errorJson.errors.join(", ");
                    toast.error(`Erro ao criar evento: ${errorMessage}`);
                    return;
                }

                const responseData = await response.json();
                const createdEventId = responseData.eventId; // Obtém o ID do evento criado
                setEventId(createdEventId); // Armazena o ID do evento
                setUploadFailed(false); // Reseta o estado de falha do upload

                // Verifica se o arquivo do banner foi selecionado
                if (bannerFile) {
                    await uploadBanner(createdEventId);
                } else {
                    toast.warning("Nenhum banner foi selecionado para upload.");
                }

                // Exibe o toast de sucesso apenas se ambas as chamadas forem bem-sucedidas
                toast.success("Evento criado com sucesso!");
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(`Erro ao criar evento: ${error.message}`);
                } else {
                    console.error("Ocorreu um erro desconhecido");
                }
            }
        }
    };

    const uploadBanner = async (eventId: string) => {
        if (!bannerFile) return;

        const formData = new FormData();
        formData.append('bannerEvent', bannerFile);

        try {
            const uploadResponse = await fetch(`http://localhost:8080/v1/events/create/${eventId}/upload-banner`, {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                const uploadError = await uploadResponse.json();
                const uploadErrorMessage = uploadError.errors.join(", ");
                toast.error(`Erro ao fazer upload do banner: ${uploadErrorMessage}`);
                setUploadFailed(true); // Marca que o upload falhou
                return;
            }

            setUploadFailed(false); // Reseta o estado de falha do upload
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Erro ao fazer upload do banner: ${error.message}`);
            } else {
                console.error("Ocorreu um erro desconhecido");
            }
            setUploadFailed(true); // Marca que o upload falhou
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
                            <>
                                <button
                                    type="submit"
                                    onClick={createEvent}
                                    className={`py-1 px-4 flex items-center rounded-md uppercase text-sm ${isValid
                                        ? "bg-balada_green_900 text-white"
                                        : "bg-red-500 text-white"
                                        }`}
                                >
                                    <span>Enviar</span>
                                    <FiSend />
                                </button>
                                {uploadFailed && (
                                    <button
                                        type="button"
                                        onClick={() => eventId && uploadBanner(eventId)}
                                        className="py-1 px-4 bg-red-500 text-white flex items-center rounded-md uppercase text-sm"
                                    >
                                        Enviar banner novamente
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default EventRegistration;