import { userLogin } from "@/actions/LoginAction";
import { isAuthenticated } from '@/Utils/Auth';
import { redirect } from 'next/navigation'

export default function Login() {

  if (isAuthenticated()) {
    redirect('/')
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-6">Login</h1>

      <form className="w-[400px] flex flex-col gap-6" action={userLogin}>
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

        <button
          type="submit"
          className="h-12 rounded-md bg-balada_green_900 text-white hover:bg-balada_violet_500"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}