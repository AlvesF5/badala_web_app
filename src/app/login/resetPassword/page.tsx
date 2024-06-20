"use client";

import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import logo from "../../../images/logo.png";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { schemaResetPassword } from "@/utils/schemas";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className=" bg-balada_green_900 py-1 px-2 text-white rounded-md h-12 hover:bg-balada_violet_500 uppercase"
    >
      enviar link de recuperação
    </button>
  );
}

export default function ResetPassword() {
  const methods = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schemaResetPassword),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = methods;

  const formTemplate = {
    email: "",
  };

  const [data] = useState(formTemplate);

  const resetPassword = async () => {
    if (isValid) {
      try {
        const response = await fetch(
          "http://localhost:8080/v1/user/resetPassword",
          {
            method: "POST", // Método HTTP
            headers: {
              "Content-Type": "application/json", // Informa o tipo de conteúdo que está sendo enviado
            },
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: getValues("email"),
            }),
          }
        );

        if (!response.ok) {
          const errorJson = await response.json();
          const errorMessage = errorJson.errors.join(", ");
          toast.error(
            `Erro ao solicitar redefinição de senha: ${errorMessage}`
          );
        }

        if (response.ok) {
          toast.success("Link de redefinição de senha enviado com sucesso!");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(
            `Erro ao solicitar redefinição de senha: ${error.message}`
          );
        } else {
          console.log("Ocorreu um erro desconhecido");
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <div className="flex">
        <Image src={logo} width={240} alt="" className=" dark:filter-none" />
      </div>

      <FormProvider {...methods}>
        <form
          className="w-[400px] flex flex-col gap-6"
          onSubmit={handleSubmit(resetPassword)}
        >
          <p className="text-gray-400">
            Insira o e-mail cadastrado para receber o link de redefinição
          </p>
          <input
            {...register('email')}
           
            onChange={(e) => e.target.value}
            className="h-12 rounded-md text-gray-400 p-2 bg-transparent border border-gray-300 focus:border-balada_green_675 focus:ring-balada_green_675 focus:outline-none"
            type="text"
            name="email"
            placeholder="Digite seu e-mail"
          />

          <SubmitButton />
        </form>
      </FormProvider>
      <div className="div_container_form_errors">
        {errors?.email && (
          <span className="label_error_input_forms">
            {String(errors.email.message)}
          </span>
        )}
      </div>
    </div>
  );
}
