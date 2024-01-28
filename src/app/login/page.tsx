'use client';

import { userLogin } from "@/app/actions/LoginAction";
import { useFormState, useFormStatus } from 'react-dom';
import { useCookies } from 'next-client-cookies';
import { redirect } from 'next/navigation'
import { Toaster, toast } from 'sonner';

const initialState = {
  message: "",
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className=" bg-balada_green_900 py-1 px-2 text-white rounded-md h-12 hover:bg-balada_violet_500">
      Fazer Login
    </button>
  )
}


export default function Login() {

  const token = useCookies().get('balada-user-token');

  if (token) {
    redirect('/')
  }

  const [state, formAction] = useFormState(userLogin, initialState)

  return (

    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-6">Login</h1>

      <form className="w-[400px] flex flex-col gap-6" action={formAction}>
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
              description: "Por favor, confira se os dados informados estão corretos.",
              style: {
                background: 'red',
              },
              className: 'class',
            })}
          </div>
        ) : null}

        <SubmitButton />
      </form>
    </div>
  )
}