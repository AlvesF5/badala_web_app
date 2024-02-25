'use client'

import StepOne from "@/components/signup/StepOne"
import StepTwo from "@/components/signup/StepTwo"
import StepThree from "@/components/signup/StepThree"
import logo from "../../images/logo.png"
import Image from "next/image"

//Hooks
import userForm from "@/hooks/useForm"
import useForm from "@/hooks/useForm";

export default function SignUp() {

    // eslint-disable-next-line react/jsx-key
    const formComponents = [<StepOne />, <StepTwo />, <StepThree />];

    const { currentStep, currentComponent } = useForm(formComponents);

    return (
        <div>
            <div className="inputs-container flex flex-col justify-center h-full">
                <div className=" flex justify-center">
                    <Image src={logo} width={100} alt="" className="" />
                </div>
                <div>
                    {currentComponent}
                </div>
            </div>
        </div>
    )
}