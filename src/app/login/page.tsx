"use client";

import { userLogin } from "@/app/actions/LoginAction";
import { useFormState, useFormStatus } from "react-dom";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import logo from "../../images/logo.png";
import Image from "next/image";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className=" bg-balada_green_900 py-1 px-2 text-white rounded-md h-12 hover:bg-balada_violet_500 uppercase"
    >
      Fazer Login
    </button>
  );
}

export default function Login() {
  const token = useCookies().get("balada-user-token");

  if (token) {
    redirect("/");
  }

  const [state, formAction] = useFormState(userLogin, initialState);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
      <div className="flex">
        <Image src={logo} width={240} alt="" className=" dark:filter-none" />
      </div>

      <form className="w-[400px] flex flex-col gap-6" action={formAction}>
        <p>Insira seu e-mail e senha para fazer login</p>
        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text"
          name="email"
          placeholder="Digite seu e-mail"
        />

        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="password"
          name="password"
          placeholder="Digite sua senha"
        />

        {state.message ? (
          <div hidden>
            {toast.error(state?.message, {
              description:
                "Por favor, confira se os dados informados estão corretos.",
              style: {
                background: "red",
              },
              className: "class",
            })}
          </div>
        ) : null}

        <SubmitButton />
      </form>
      <div>
        <Link href={""}>
          <p className="text-xs text-balada_green_675">Clique aqui para recuperar sua senha</p>
        </Link>
      </div>
    </div>
  );
}
