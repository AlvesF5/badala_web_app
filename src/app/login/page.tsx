"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import logo from "../../images/logo.png";
import Image from "next/image";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";
import { handleToggle } from "../../utils/togglePasswordVisibility";
import { loginUserSchema } from "@/utils/schemas";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useCookies } from 'react-cookie';

type LoginFormInputs = z.infer<typeof loginUserSchema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginUserSchema),
  });

  
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);
  const [cookies, setCookie, removeCookie] = useCookies(['balada-user-token']);

  const token = cookies['balada-user-token'];

  if (token) {
    redirect("/");
  }

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("http://localhost:8080/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorJson = await response.json();
        const errorMessage = errorJson.errors.join(", ");
        toast.error(`Erro ao realizar o login: ${errorMessage}`);
        return;
      }

      const result = await response.json();

      console.log(result);

      toast.success("Login realizado com sucesso!");

      setCookie('balada-user-token', result.user.token, { maxAge: 60 * 60 * 24, path: '/' });

      console.log("Login result:", result);

      await new Promise<void>((resolve) => setTimeout(resolve, 3000));
      
      window.location.href = "/";

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Erro ao realizar o login: ${error.message}`);
      } else {
        console.log("Ocorreu um erro desconhecido");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <div className="flex">
        <Image src={logo} width={240} alt="" className=" dark:filter-none" />
      </div>
      <form
        className="w-[400px] flex flex-col gap-6 p-6 md:p-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="flex flex-col gap-1">
            <div className="relative z-0 w-full mb-5 group">
              <input
                {...register("email")}
                type="email"
                onChange={(e) => e.target.value}
                name="email"
                id="email"
                className="input_default_one_line peer"
              />
              <label
                htmlFor="email"
                className="label_input_default_one_line left-0"
              >
                Email
              </label>
            </div>
          </div>
          {errors.email && <span className=" text-gray-200 text-sm">{errors.email.message}</span>}
        </div>
        <div>
          <div>
            <div className="mb-4 relative z-0 w-full group flex flex-col">
              <input
                {...register("password")}
                type={type}
                name="password"
                id="password"
                onChange={(e) => e.target.value}
                className="input_default_one_line peer"
              />
              <label
                htmlFor="password"
                className="label_input_default_one_line"
              >
                Senha
              </label>
              <span
                className="flex justify-end text-gray-400"
                onClick={() =>
                  handleToggle(type, setType, setIcon, eye, eyeOff)
                }
              >
                <Icon className=" -mt-7" icon={icon} size={20} />
              </span>
            </div>
          </div>
          {errors.password && <span className=" text-gray-200 text-sm">{errors.password.message}</span>}
        </div>
        <div className="flex items-center border-gray-200 rounded-b dark:border-gray-600 w-full">
          <button
            type="submit"
            // aria-disabled={pending}
            className=" bg-balada_green_900 py-1 px-2 text-white rounded-md h-12 hover:bg-balada_violet_500 uppercase w-full"
          >
            Fazer login
          </button>
        </div>
      </form>
      <div>
        <Link href={"/login/resetPassword"}>
          <p className="text-sm text-balada_green_675">
            Clique aqui para recuperar sua senha
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
