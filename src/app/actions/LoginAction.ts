"use server"

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { FormLoginSchema } from "@/lib/schema";

export async function userLogin(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const resp = await fetch("http://localhost:8080/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });


    console.log("Status retornado: "+resp.status)

    if (resp.status===500) {
      return {message: "Usuário e/ou senha inválidos!"}
      console.log(Error("Usuário e/ou senha inválidos!"))
    }

    const userResp = await resp.json();

    // cookies().set('balada-user-token', userResp.user.token);
    setCookie('balada-user-token', userResp.user.token, { cookies });
    return redirect('/');

  } catch (e: any) {
    console.log(e)
    return { message: 'Falha ao realizar login!' }
  }

};