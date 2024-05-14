'use client'

import StepOne from "@/components/signup/StepOne"
import StepTwo from "@/components/signup/StepTwo"
import StepThree from "@/components/signup/StepThree"
import Steps from "@/components/signup/Steps"
import logo from "../../images/logo.png"
import Image from "next/image"
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { FiSend } from 'react-icons/Fi'
import { useState } from "react";
import { FormProvider, useForm, Controller } from 'react-hook-form';

//Hooks
import useMyForms from "@/hooks/useMyForms";
import StepReview from "@/components/signup/StepReview";
import { schemaUserLogin, schemaUserPersonalInfo, schemaUserAddress, schemaUserTerms } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { unMask } from "remask";
import { Toaster, toast } from 'sonner';

export default function SignUp() {

    const [step, setStep] = useState(0);

    const methods = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(step === 0 ? schemaUserLogin : step === 1 ? schemaUserPersonalInfo : step === 2 ? schemaUserAddress : schemaUserTerms)
    })

    const { handleSubmit, register, formState: { errors, isValid }, setValue, getValues } = methods

    const formTemplate = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        retryPassword: "",
        phone: "",
        birthDate: "",
        documentNumber: "",
        gender: "",
        cep: "",
        street: "",
        number: "",
        state: "",
        city: "",
        neighborhood: "",
        complement: ""
    }

    const [data, setData] = useState(formTemplate);

    const updateFielHandler = (key: any, value: any) => {
        setData((prev) => {
            return { ...prev, [key]: value };
        })
    }

    // eslint-disable-next-line react/jsx-key
    const formComponents = [<StepOne data={data} updateFielHandler={updateFielHandler} register={register} errors={errors} />, <StepTwo data={data} updateFielHandler={updateFielHandler} register={register} errors={errors} />, <StepThree data={data} updateFielHandler={updateFielHandler} register={register} errors={errors} setValue={setValue} getValues={getValues} />, <StepReview data={data} register={register} errors={errors} />];

    const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useMyForms(formComponents);

    const onSubmit = (data: any, e: any) => {
        changeStep(currentStep + 1, e)
        setStep(currentStep + 1)
    }

    const createUser = () => {
        if (isValid) {
            fetch('http://localhost:8080/v1/user/create', {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json', // Informa o tipo de conteúdo que está sendo enviado
                },
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                    retryPassword: data.retryPassword,
                    phone: unMask(data.phone),
                    birthDate: data.birthDate,
                    documentNumber: unMask(data.documentNumber),
                    gender: data.gender,
                    address: {
                        cep: unMask(data.cep),
                        street: data.street,
                        number: data.number,
                        state: data.state,
                        city: data.city,
                        neighborhood: data.neighborhood,
                        complement: data.complement
                    }
                }),
            })
                .then(response => response.json()) // Converte a resposta para JSON
                .then(data => {
                    console.log(data); // Exibe os dados recebidos na resposta
                    toast.success('Cadastro realizado com sucesso!');
                })
                .catch(error => {
                    toast.error('Erro ao realizar o cadastro!');
                    console.error('Erro ao fazer a requisição:', error); // Captura e exibe erros, se houver
                })


            console.log(data.firstName)
            console.log(data.lastName)
            console.log(data.email)
            console.log(data.city)
            console.log(unMask(data.documentNumber))
        }
    }

    return (
        <div>
            <div className="flex flex-col h-full items-center w-full mt-44 gap-8">
                <div className=" flex">
                    <Image src={logo} width={240} alt="" className="" />
                </div>

                <Steps currentStep={currentStep} />

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full flex justify-center flex-col items-center">
                        <div className=" w-9/12 md:w-4/12">
                            {currentComponent}
                        </div>
                        <div className='actions flex flex-row gap-2 mt-3 text-white font-semibold text-md w-9/12 md:w-4/12 justify-end'>
                            {!isFirstStep && (<button type="button" onClick={() => { changeStep(currentStep - 1); setStep(currentStep - 1) }} className='py-3 px-3 bg-balada_violet_500 flex items-center rounded-md uppercase'><GrFormPrevious /><span>Voltar</span></button>)}
                            {!isLastStep ? (<button type="submit" className='py-3 px-3 bg-balada_green_900 flex items-center rounded-md uppercase'><span>Avançar</span><GrFormNext /></button>) : (
                                <button type="submit" onClick={createUser} className={`py-1 px-4 flex items-center rounded-md uppercase ${isValid ? 'bg-balada_green_900 text-white' : 'bg-red-500 text-white'}`}><span>Enviar</span><FiSend /></button>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}