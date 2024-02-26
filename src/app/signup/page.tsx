'use client'

import StepOne from "@/components/signup/StepOne"
import StepTwo from "@/components/signup/StepTwo"
import StepThree from "@/components/signup/StepThree"
import logo from "../../images/logo.png"
import Image from "next/image"
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

//Hooks
import userForm from "@/hooks/useForm"
import useForm from "@/hooks/useForm";

export default function SignUp() {

    // eslint-disable-next-line react/jsx-key
    const formComponents = [<StepOne />, <StepTwo />, <StepThree />];

    const { currentStep, currentComponent } = useForm(formComponents);

    return (
        <div>
            <div className="flex flex-col h-full items-center w-full mt-44 gap-8">
                <div className=" flex">
                    <Image src={logo} width={240} alt="" className="" />
                </div>
               
                <div className=" w-9/12 md:w-4/12">
                    {currentComponent}
                </div>
                <div className='actions flex gap-2 mt-3 text-white font-semibold text-md w-9/12 md:w-4/12 justify-end'>
                    <button type="button" className='py-3 px-3 bg-balada_violet_500 flex items-center rounded-md uppercase'><GrFormPrevious /><span>Voltar</span></button>
                    <button type="submit" className='py-1 px-2 bg-balada_green_900 flex items-center rounded-md uppercase'><span>Avançar</span><GrFormNext /></button>
                </div>
            </div>
        </div>
    )
}