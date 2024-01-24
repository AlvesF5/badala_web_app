"use server"

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';


export const  userLogin = async(formData: FormData) => {
    const email = formData.get('email');
    const password = formData.get('password');
  
    if (!email || !password) {
      return {
        message: 'Please fill all fields',
        success: false,
      };
    }

    const  resp  = await fetch("http://localhost:8080/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
      });
  
    const userResp = await resp.json();

    if(!resp.ok){
        throw new Error("Falha ao fazer login")
    }

    cookies().set('balada-user-token', userResp.user.token);

  
    redirect('/');
  };