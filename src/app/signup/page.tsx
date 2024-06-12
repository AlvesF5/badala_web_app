"use client";

import StepOne from "@/components/signup/StepOne";
import StepTwo from "@/components/signup/StepTwo";
import StepThree from "@/components/signup/StepThree";
import Steps from "@/components/signup/Steps";
import logo from "../../images/logo.png";
import Image from "next/image";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSend } from "react-icons/Fi";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Icon } from "react-icons-kit";
import { chevronRight } from "react-icons-kit/fa/chevronRight";

//Hooks
import useMyForms from "@/hooks/useMyForms";
import StepReview from "@/components/signup/StepReview";
import {
  schemaUserLogin,
  schemaUserPersonalInfo,
  schemaUserAddress,
  schemaUserTerms,
} from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { unMask } from "remask";
import { toast } from "sonner";
import Link from "next/link";
import Modal, { useModal } from "@/components/modal/DefaultModal";

export default function SignUp() {
  const [step, setStep] = useState(0);

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleModalConfirm = () => {
    closeModal();
  };

  const methods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(
      step === 0
        ? schemaUserLogin
        : step === 1
        ? schemaUserPersonalInfo
        : step === 2
        ? schemaUserAddress
        : schemaUserTerms
    ),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = methods;

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
    complement: "",
  };

  const [data, setData] = useState(formTemplate);

  const updateFielHandler = (key: any, value: any) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  // eslint-disable-next-line react/jsx-key
  const formComponents = [
    <StepOne
      key="step-one"
      data={data}
      updateFielHandler={updateFielHandler}
      register={register}
      errors={errors}
    />,
    <StepTwo
      key="step-two"
      data={data}
      updateFielHandler={updateFielHandler}
      register={register}
      errors={errors}
    />,
    <StepThree
      key="step-three"
      data={data}
      updateFielHandler={updateFielHandler}
      register={register}
      errors={errors}
      setValue={setValue}
      getValues={getValues}
    />,
    <StepReview
      key="step-review"
      data={data}
      register={register}
      errors={errors}
      setValue={setValue}
    />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useMyForms(formComponents);

  const onSubmit = (data: any, e: any) => {
    changeStep(currentStep + 1, e);
    setStep(currentStep + 1);
  };

  const createUser = async () => {
    if (isValid) {
      try {
        const response = await fetch("http://localhost:8080/v1/user/create", {
          method: "POST", // Método HTTP
          headers: {
            "Content-Type": "application/json", // Informa o tipo de conteúdo que está sendo enviado
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
              complement: data.complement,
            },
          }),
        });

        if (!response.ok) {
          const errorJson = await response.json();
          const errorMessage = errorJson.errors.join(", ");
          toast.error(`Erro ao realizar o cadastro: ${errorMessage}`);
        }

        if (response.ok) {
          openModal();
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(`Erro ao realizar o cadastro: ${error.message}`);
        } else {
          console.log("Ocorreu um erro desconhecido");
        }
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col h-full items-center w-full mt-44 gap-8">
        <div className=" flex">
          <Image src={logo} width={240} alt="" className="" />
        </div>

        <Steps currentStep={currentStep} />

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex justify-center flex-col items-center"
          >
            <div className=" w-10/12 md:w-4/12">{currentComponent}</div>
            <div className="actions flex flex-row gap-2 mt-3 text-white font-semibold text-md w-10/12 md:w-4/12 justify-end">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={() => {
                    changeStep(currentStep - 1);
                    setStep(currentStep - 1);
                  }}
                  className="py-3 px-3 bg-balada_violet_500 flex items-center rounded-md uppercase"
                >
                  <GrFormPrevious />
                  <span>Voltar</span>
                </button>
              )}
              {!isLastStep ? (
                <button
                  type="submit"
                  className="py-3 px-3 bg-balada_green_900 flex items-center rounded-md uppercase"
                >
                  <span>Avançar</span>
                  <GrFormNext />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={createUser}
                  className={`py-1 px-4 flex items-center rounded-md uppercase ${
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

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={"Termos de uso"}
        >
          <div className="flex flex-col gap-4">
            <div className="flex">
              <div className="p-2">
                <p className=" text-sm">
                  Cadastro realizado com sucesso! Um link de confirmação foi
                  enviado para o e-mail{" "}
                  <span className=" text-balada_violet_500 font-medium">
                    {data.email}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2 items-center justify-center w-full border-l-2 p-4">
                <p className=" text-nowrap text-xs text-gray-500">
                  clique aqui, caso não tenha recebido
                </p>
                <Link href="">
                  <button
                    type="button"
                    className="text-white bg-balada_violet_500 hover:bg-balada_green_900 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-balada_violet_500 dark:hover:bg-balada_green_900 dark:focus:ring-purple-900"
                  >
                    Enviar e-mail
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center cursor-pointer gap-1">
              <span className=" text-balada_green_900">
                <Icon icon={chevronRight} />
              </span>
              <p className="text-xs mt-0.5 text-gray-300">Ir para página inicial</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
