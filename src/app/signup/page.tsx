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
import { FieldValues, FormProvider, FormState, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Toaster, toast } from 'sonner';

//Hooks
import useMyForms from "@/hooks/useMyForms";
import StepReview from "@/components/signup/StepReview";
import { z } from 'zod';
import { formSchemaCreateUser } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
    const formTemplate = {
        // firstName: "",
        // lastName: "",
        email: "",
        password: "",
        retryPassword: "",
        // phone: "",
        // birthDate: "",
        // documentNumber: "",
        // gender: "",
        // cep: "",
        // street: "",
        // number: "",
        // state: "",
        // city: "",
        // neighborhood: "",
        // complement: ""
    }

    const [data, setData] = useState(formTemplate);

    const [message, setMessage] = useState("");

    const updateFielHandler = (key: any, value: any) => {
        setData((prev) => {
            return { ...prev, [key]: value };
        })
    }

    // eslint-disable-next-line react/jsx-key
    const formComponents = [<StepOne data={data} updateFielHandler={updateFielHandler} />, <StepTwo data={data} updateFielHandler={updateFielHandler} />, <StepThree data={data} updateFielHandler={updateFielHandler} />, <StepReview data={data} updateFielHandler={updateFielHandler} />];

    const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } = useMyForms(formComponents);

    async function validate() {
        let schema = yup.object().shape({
            email: yup.string().email('Insira um e-mail com formato válido!').required("Campo e-mail é obrigatório!"),
            password: yup.string().min(8, 'Senha precisa ter pelo menos 8 caracteres.').required("Campo senha é obrigatório!"),
            retryPassword: yup.string().min(8, 'Repetição de senha precisa ter pelo menos 8 caracteres.').required("Campo repetição de senha é obrigatório!"),
        });

        try {
            await schema.validate({
                retryPassword: data.retryPassword,
                password: data.password,
                email: data.email,
            });
            return true;
        } catch (error: any) {
            setMessage(error.errors);
            return false
        }
    }

    const sendMsg = async (e: any) => {

        // Bloquear o recarregamento da página
        e.preventDefault();

        // Chamar a função validar o formulário
        if (!(await validate())) return;

        // setMessage("Enviar os dados para API!");
        changeStep(currentStep + 1, e)

        // (e:any) => changeStep(currentStep + 1, e)

        // Manipular os dados recebidos, por exemplo, enviar os dados para API  



        // Criar a constante com os dados do cabeçalho
        /*const headers = {
          'headers': {
            // Indicar que será enviado os dados em formato de objeto
            'Content-Type': 'application/json'
          }
        };
    
        // Fazer a requisição para o servidor utilizando axios, indicando o método da requisição, o endereço, enviar os dados do formulário e o cabeçalho
        await axios.post('http://localhost:8080/message', data, headers)
          .then((response) => { // Acessa o then quando a API retornar status 200
            // Atribuir a mensagem no state message
            setMessage(response.data.message);
    
            // Limpar os dados do state e os dados dos campos do formulário
            setData({
              name: '',
              email: '',
              subject: '',
              content: ''
            });
          }).catch((err) => { // Acessa o catch quando a API retornar erro
            // Atribuir a mensagem no state message
            //setMessage(err.response.data.message);
            if (err.response) {
              setMessage(err.response.data.message);
            } else {
              setMessage("Erro: Tente novamente mais tarde ou entre contato com ...!");
            }
          });*/
    }

    return (
        <div>
            <div className="flex flex-col h-full items-center w-full mt-44 gap-8">
                <div className=" flex">
                    <Image src={logo} width={240} alt="" className="" />

                </div>
                <Steps currentStep={currentStep} />
                <form onSubmit={sendMsg} className="w-full flex justify-center flex-col items-center">
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

                    <div hidden>
                        {message? toast.error(message) : ""}
                    </div>


                </form>

            </div>
        </div>
    )
}