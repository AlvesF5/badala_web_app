"use client";

import { useForm, FormProvider, useFormContext, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { eventSchema } from "@/utils/schemas";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import Steps from "@/components/signup/Steps"; // Componente de Steps
import { mask } from "remask"
import { checkCEP } from '@/components/utils/checkCep'; 

const EventRegistration = () => {
    const steps = ["Info. Básicas", "Setores", "Endereço"];
    const methods = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            eventDTO: {
                name: '',
                startDate: '',
                endDate: '',
                spaceName: '',
                category: '',
                classification: '',
                description: ''
            },
            sectorDTO: {
                sectors: [
                    { name: '', capacity: 0, description: '', salePrice: 0, sectorType: '' },
                ],
            },
            addressDTO: {
                cep: '',
                street: '',
                number: '',
                state: '',
                city: '',
                neighborhood: '',
                complement: '',
            },
        },
    });

    const [step, setStep] = useState(1);

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        formData.append('bannerEvent', new Blob(['Banner Placeholder'], { type: 'text/plain' }));
        formData.append('createEventDTO', JSON.stringify(data));

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
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <div className="flex flex-col h-full items-center w-full mt-44 gap-8">
            <Steps currentStep={step} steps={steps} /> {/* Barra de progresso */}
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full flex justify-center flex-col items-center">
                    <div className="w-10/12 md:w-4/12">
                        {step === 1 && <EventDetails />}
                        {step === 2 && <SectorDetails />}
                        {step === 3 && <AddressDetails />}
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
                                type="button"
                                onClick={nextStep}
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

const EventDetails = () => {
    const { register, setValue } = useFormContext();
    const [description, setDescription] = useState('');

    // Atualiza o valor do campo no react-hook-form
    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setValue('eventDTO.description', value); // Atualiza o valor no formulário
    };
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Detalhes do Evento</h2>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    {...register('eventDTO.name')}
                    className="input_default_one_line peer"
                />
                <label htmlFor="eventDTO.name" className="label_input_default_one_line">Nome do Evento</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('eventDTO.startDate')}
                        type="datetime-local"
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="eventDTO.startDate" className="label_input_default_one_line">Data de Início</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('eventDTO.endDate')}
                        type="datetime-local"
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="eventDTO.endDate" className="label_input_default_one_line">Data de Término</label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        {...register('eventDTO.spaceName')}
                        className="input_default_one_line peer"
                    />
                    <label htmlFor="eventDTO.spaceName" className="label_input_default_one_line">Local do evento</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <select {...register('eventDTO.category')} className="select_input_default_one_line peer">
                        <option value="SHOWS" selected>Shows</option>
                        <option value="THEATER">Teatro</option>
                        <option value="TALK">Palestra</option>
                        <option value="STAND_UP">Stand-up</option>
                        <option value="KIDS">Infantil</option>
                    </select>
                    <label htmlFor="eventDTO.category" className="label_input_default_one_line">Categoria</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <select {...register('eventDTO.classification')} className="select_input_default_one_line peer">
                        <option value="CL" selected>Livre</option>
                        <option value="C10">10 Anos</option>
                        <option value="C12">12 Anos</option>
                        <option value="C14">14 Anos</option>
                        <option value="C16">16 Anos</option>
                        <option value="C18">18 Anos</option>
                    </select>
                    <label htmlFor="eventDTO.classification" className="label_input_default_one_line">Classificação</label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-5 mt-4 group">
                <textarea
                    {...register('eventDTO.description')}
                    className="textarea_default peer min-h-32"
                    name="eventDTO.description"
                    id="eventDTO.description"
                />
                <label htmlFor="eventDTO.description" className="label_textarea">
                    Descrição do Evento
                </label>
            </div>
        </div>
    );
};

const SectorDetails = () => {
    const { register, control } = useFormContext();

    // useFieldArray para gerenciar a lista de setores
    const { fields, append, remove } = useFieldArray({
        control,
        name: "sectorDTO.sectors", // Nome do campo que será um array
    });

    // Função para adicionar um novo setor
    const addSector = () => {
        append({
            name: "",
            capacity: 0,
            description: "",
            salePrice: 0,
            sectorType: "",
        });
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Setores</h2>

            {fields.map((field, index) => (
                <div key={field.id} className="mb-6">
                    <div className="relative z-0 w-full mb-8 group">
                        <input
                            {...register(`sectorDTO.sectors.${index}.name`)}
                            className="input_default_one_line peer"
                        />
                        <label htmlFor={`sectorDTO.sectors.${index}.name`} className="label_input_default_one_line">
                            Nome do Setor
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <textarea
                            {...register(`sectorDTO.sectors.${index}.description`)}
                            className="textarea_default peer min-h-32"
                            name="eventDTO.description"
                            id="eventDTO.description"
                        />
                        <label htmlFor={`sectorDTO.sectors.${index}.description`} className="label_textarea">
                            Descrição
                        </label>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            {...register(`sectorDTO.sectors.${index}.capacity`)}
                            type="number"
                            placeholder="Capacidade"
                            className="input_default_one_line peer"
                        />
                        <label htmlFor={`sectorDTO.sectors.${index}.capacity`} className="label_input_default_one_line">
                            Capacidade
                        </label>
                    </div>


                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            {...register(`sectorDTO.sectors.${index}.salePrice`)}
                            type="number"
                            placeholder="Preço de Venda"
                            className="input_default_one_line peer"
                        />
                        <label htmlFor={`sectorDTO.sectors.${index}.salePrice`} className="label_input_default_one_line">
                            Preço de Venda
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <select {...register(`sectorDTO.sectors.${index}.sectorType`)} className="select_input_default_one_line peer">
                        <option value="TRACK" selected>Pista</option>
                        <option value="CABIN">Camarote</option>
                        <option value="TABLE">Mesa</option>
                        <option value="LOUNGE">Lounge</option>
                        <option value="OTHER">Outro</option>
                    </select>
                        <label htmlFor={`sectorDTO.sectors.${index}.sectorType`} className="label_input_default_one_line">
                            Tipo de Setor
                        </label>
                    </div>

                    </div>

                    {/* Botão para remover setor */}
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500"
                    >
                        Remover Setor
                    </button>
                </div>
            ))}

            {/* Botão para adicionar novo setor */}
            <button
                type="button"
                onClick={addSector}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Adicionar Setor
            </button>
        </div>
    );
};

const AddressDetails = () => {

    const formTemplate = {
        cep: "",
        street: "",
        number: "",
        state: "",
        city: "",
        neighborhood: "",
        complement: "",
      };

    const [data, setData] = useState(formTemplate);

    const updateFielHandler = (key: any, value: any) => {
      setData((prev: any) => {
        return { ...prev, [key]: value };
      });
    };
  
    const { register, setValue, getValues } = useFormContext();
    return (
        <div className="grid grid-cols-6 md:gap-6 gap-2">
        <div className="relative z-0 w-full mb-5 group md:col-span-1 col-span-2">
            <input
                type="text"
                {...register("addressDTO.cep")}
                value={mask(data?.cep, ['99999-999']) || ""}
                onChange={(e) => { checkCEP(e, setValue, getValues, updateFielHandler); updateFielHandler("cep", e.target.value) }}
                name="addressDTO.cep"
                id="addressDTO.cep"
                className="input_default_one_line peer"
            />
            <label
                htmlFor="addressDTO.cep"
                className="label_input_default_one_line">CEP</label>
        </div>
        <div className="relative z-0 w-full mb-5 group col-span-4">
            <input
                type="text"
                {...register("addressDTO.street")}
                value={data.street || ""}
                name="addressDTO.street"
                id="addressDTO.street"
                className="input_default_one_line peer"
            />
            <label
                htmlFor="addressDTO.street"
                className="label_input_default_one_line">Rua/Logradouro</label>
        </div>
        <div className="relative z-0 w-full mb-5 group col-span-1">
            <input
                type="text"
                {...register("addressDTO.number")}
                value={data.number || ""}
                name="addressDTO.number"
                id="addressDTO.number"
                className="input_default_one_line peer"
            />
            <label
                htmlFor="addressDTO.number"
                className="label_input_default_one_line">Número</label>
        </div>
        <div className="relative z-0 w-full mb-5 group col-span-1">
            <select
                value={data.state || ""}
                {...register("addressDTO.state")}
                name="addressDTO.state"
                id="addressDTO.state"
                className="select_input_default_one_line peer"
            >
                <option selected value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
                <option value="EX">Estrangeiro</option>
            </select>
            <label
                htmlFor="addressDTO.state"
                className="label_input_default_one_line">Estado</label>
        </div>
        <div className="relative z-0 w-full mb-5 group md:col-span-3 col-span-4">
            <input
                type="text"
                {...register("addressDTO.city")}
                value={data.city || ""}
                name="addressDTO.city"
                id="addressDTO.city"
                className="input_default_one_line peer"
            />
            <label
                htmlFor="addressDTO.city"
                className="label_input_default_one_line">Cidade</label>
        </div>
        <div className="relative z-0 w-full mb-5 group md:col-span-2 col-span-6">
            <input
                type="text"
                {...register("addressDTO.neighborhood")}
                value={data.neighborhood || ""}
                name="addressDTO.neighborhood"
                id="addressDTO.neighborhood"
                className="input_default_one_line peer"
            />
            <label
                htmlFor="addressDTO.neighborhood"
                className="label_input_default_one_line">Bairro</label>
        </div>
        <div className="relative z-0 w-full mb-5 group col-span-6">
            <input
                type="text"
                {...register("addressDTO.complement")}
                value={data.complement || ""}
                name="addressDTO.complement"
                id="addressDTO.complement"
                className="input_default_one_line peer"
            />
            <label
                htmlFor="addressDTO.complement"
                className="label_input_default_one_line">Complemento</label>
        </div>


    </div>
        
    );
};

export default EventRegistration;