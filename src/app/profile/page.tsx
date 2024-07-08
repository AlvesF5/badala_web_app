"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Image from "next/image";
import DateFormatterWithHour from "@/components/utils/DateFormaterWithHour";
import DateFormatter from "@/components/utils/DateFormater";
import { mask } from "remask";
import {
  selectGender,
  selectUserStatus,
  selectUserGreeting
} from "@/utils/Functions";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  documentNumber: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  address: string;
};

const getUserById = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:8080/v1/user/${userId}`, {
      method: "GET",
    });

    // Log do status da resposta
    console.log(`Status da resposta: ${response.status}`);

    if (!response.ok) {
      const errorJson = await response.json();
      const errorMessage = errorJson.errors
        ? errorJson.errors.join(", ")
        : "Erro desconhecido";
      toast.error(`Erro ao obter o usuário: ${errorMessage}`);
      return null;
    }

    // Verifica se a resposta tem conteúdo antes de tentar convertê-la para JSON
    const responseText = await response.text();
    console.log(`Conteúdo da resposta: ${responseText}`); // Log do conteúdo da resposta

    if (!responseText) {
      toast.error("Resposta vazia do servidor");
      return null;
    }

    const userData = JSON.parse(responseText);
    return userData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(`Erro ao obter o usuário: ${error.message}`);
    } else {
      console.log("Ocorreu um erro desconhecido");
    }
    return null;
  }
};

const UserProfile = () => {
  const { get } = useCookies();
  const token = get("balada-user-token");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) {
      redirect("/login");
      return;
    }
    try {
      const decodedToken: { user_id: string } = jwtDecode(token);
      const userId = decodedToken.user_id;
      console.log(userId);
      const fetchUser = async () => {
        const userData = await getUserById(userId);
        if (userData) {
          setUser(userData);
        }
      };
      fetchUser();
    } catch (error) {
      console.error("Token inválido:", error);
      redirect("/login");
    }
  }, [token]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="text-center h-screen flex justify-center items-center">
      <div className="container mx-auto w-1/3">
        <div className="md:flex no-wrap md:-mx-2">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-balada_gray_600 p-3 border-t-4 border-balada_green_675 h-full">
              <h1 className="text-balada_green_800 font-bold text-xl leading-8 my-1">
                {selectUserGreeting(user.gender ) + user.firstName+"!"}
              </h1>
              <h3 className="text-balada_violet_375 font-lg text-semibold leading-6">
                {user.email}
                <p className="text-sm text-balada_green_675 cursor-pointer">
                  alterar senha
                </p>
              </h3>
              <ul className="bg-balada_gray_450 text-gray-300 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span className="font-semibold text-balada_violet_375">
                    Status:
                  </span>
                  <span className="ml-auto">
                    <span
                      className={`py-1 px-2 rounded text-white text-sm ${
                        user.active ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {selectUserStatus(user.active)}
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-semibold text-balada_violet_375">
                    Data de cadastro:
                  </span>
                  <span className="ml-auto text-sm">
                    <DateFormatterWithHour timestamp={user.createdAt} />
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-semibold text-balada_violet_375">
                    Gênero:
                  </span>
                  <span className="ml-auto text-sm">
                    {selectGender(user.gender)}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-semibold text-balada_violet_375">
                    Data de nascimento:
                  </span>
                  <span className="ml-auto text-sm"><DateFormatter timestamp={user.birthDate} /></span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-semibold text-balada_violet_375">
                    CPF:
                  </span>
                  <span className="ml-auto text-sm">
                    {mask(user.documentNumber, ["999.999.999-99"])}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-semibold text-balada_violet_375">
                    Celular:
                  </span>
                  <span className="ml-auto text-sm">
                    {mask(user.phone, ["(99) 99999-9999"])}
                  </span>
                </li>
                <li className="flex items-center py-3 flex-wrap">
                  <span className="font-semibold text-balada_violet_375">
                    Endereço:
                  </span>
                  <span className="text-sm mt-2">{user.address}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-balada_gray_600 w-2/3 border-t-4 border-balada_green_675">
            <div className="mx-auto py-8 sm:px-6 sm:py-24">
              <div className="px-2 sm:px-0">
                <h1 className="text-2xl font-bold tracking-tight text-balada_green_675 sm:text-3xl">
                  Meus eventos
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
