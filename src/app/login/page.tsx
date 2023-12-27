'use client'

import React, { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "../../images/logo.png"
import Image from "next/image"
import { Metadata } from "next";
import { signIn } from "next-auth/react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function handleSubmit(event: SyntheticEvent) {
        event.preventDefault()

        const result = await signIn('credentials',{
            email,
            password,
            redirect: false
        })

        if(result?.error){
            console.log("Deu erro!"+result)
            return
        }

        console.log("Resultado "+result)

        router.replace('/account')
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
                {/* <div className="flex justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm mb-12">
                    <Image className="w-48 md:w-56 xl:w-64 absolute object-cover cursor-pointer" src={logo} alt="Shows, eventos e muito +" />
                </div> */}
                <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Entre na sua conta
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6">

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        onChange={(event)=>setEmail(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Senha
                                    </label>
                                    <div className="text-sm">
                                        <div className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300">
                                            Esqueceu sua senha?
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                        onChange={(event)=>setPassword(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    className="disabled:opacity-40 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Fazer Login
                                </button>
                            </div>
                        </div>

                        <p className="mt-10 text-center text-sm text-gray-400">
                            Não possui uma conta?{' '}
                            <button type="submit" className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">
                                Criar Conta
                            </button>
                        </p>
                    </div>
                </form>

            </div>
        </>
    )
}