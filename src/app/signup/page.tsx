'use client'

import StepOne from "@/components/signup/StepOne"
import StepTwo from "@/components/signup/StepTwo"
import StepThree from "@/components/signup/StepThree"
import Steps from "@/components/signup/Steps"
import logo from "../../images/logo.png"
import Image from "next/image"
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { FiSend } from 'react-icons/Fi'

//Hooks
import useForm from "@/hooks/useForm";
import StepReview from "@/components/signup/StepReview"

export default function SignUp() {

    // eslint-disable-next-line react/jsx-key
    const formComponents = [<StepOne />, <StepTwo />, <StepThree />, <StepReview/>];

    const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useForm(formComponents);

    return (
        <div>
            <div className="flex flex-col h-full items-center w-full mt-44 gap-8">
                <div className=" flex">
                    <Image src={logo} width={240} alt="" className="" />
                </div>
                <Steps currentStep={currentStep}/>
                
                <form onSubmit={(e) => changeStep(currentStep + 1, e)} className="w-full flex justify-center">
                    <div className="w-full flex flex-col items-center mx-auto">
                        <div className=" w-9/12 md:w-4/12">
                            {currentComponent}
                        </div>
                        <div className='actions flex flex-row gap-2 mt-3 text-white font-semibold text-md w-9/12 md:w-4/12 justify-end'>
                            {!isFirstStep && (<button type="button" onClick={() => changeStep(currentStep - 1)} className='py-3 px-3 bg-balada_violet_500 flex items-center rounded-md uppercase'><GrFormPrevious /><span>Voltar</span></button>)}
                            {!isLastStep ? (<button type="submit" className='py-3 px-3 bg-balada_green_900 flex items-center rounded-md uppercase'><span>Avançar</span><GrFormNext /></button>) : (
                                <button type="button" className='py-1 px-4 bg-balada_green_900 flex items-center rounded-md uppercase'><span>Enviar</span><FiSend /></button>
                            )}
                        </div>
                    </div>

                </form>


            </div>
        </div>
    )
}