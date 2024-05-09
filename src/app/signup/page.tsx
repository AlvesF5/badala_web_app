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

export default function SignUp() {

    const [step, setStep] = useState(0);

    const methods = useForm({
        mode: 'all',
        reValidateMode: 'onChange',
        resolver: zodResolver(step === 0 ? schemaUserLogin : step === 1 ? schemaUserPersonalInfo : step === 2 ? schemaUserAddress : schemaUserTerms)
    })

    const {handleSubmit, register, formState: { errors }, setValue, getValues} = methods

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
    const formComponents = [<StepOne data={data} updateFielHandler={updateFielHandler} register={register} errors={errors} />, <StepTwo data={data} updateFielHandler={updateFielHandler} register={register} errors={errors} />, <StepThree data={data} updateFielHandler={updateFielHandler} register={register} errors={errors} setValue={setValue} getValues={getValues}/>, <StepReview data={data} register={register} errors={errors}/>];

    const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useMyForms(formComponents);

    const onSubmit = (data: any, e: any) => {
        changeStep(currentStep + 1, e)
        setStep(currentStep + 1)
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
                                <button type="submit" className='py-1 px-4 bg-balada_green_900 flex items-center rounded-md uppercase'><span>Enviar</span><FiSend /></button>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}