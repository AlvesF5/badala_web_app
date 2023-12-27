import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
    title: "Minha Conta"
}

export default async function Account() {
    const session = await getServerSession(nextAuthOptions)

    // const router = useRouter();

    // async function logout() {
    //     await signOut({
    //         redirect: false
    //     })
    //     router.replace('/')
    // }

    return (
        <main>
            <div>Olá! Bem-vindo(a), {session?.user.name}</div>
            {/* <button onClick={logout} className="button-balada-gree">Sair</button> */}
        </main>
    )
}