import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: "Minha Conta"
}

export default function Account() {
    return (
        <main>
            <div>Sua conta!</div>
        </main>
    )
}