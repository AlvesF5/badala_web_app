"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Image from "next/image";
import DateFormatterWithHour from "@/components/utils/DateFormaterWithHour";
import FullSizeImage from "@/components/utils/FullSizeImage";
import DateFormatter from "@/components/utils/DateFormater";
import { mask } from "remask";
import {
  selectGender,
  selectUserStatus,
  selectUserGreeting,
} from "@/utils/Functions";
import brega from "../../images/sliderhome/brega.jpg";
import safadao from "../../images/sliderhome/safadao.jpg";

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
  address: {
    cep: string;
    street: string;
    number: string;
    state: string;
    city: string;
    neighborhood: string;
    complement: string | "";
  };
  addressString: string;
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
    <main className="text-center h-screen flex justify-center items-center w-full mx-auto">
      <div className="container mx-auto w-4/12 flex">
        <div className="md:flex no-wrap md:-mx-2 w-f mx-auto justify-center">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="py-14 px-4">
              <h1 className="text-balada_green_800 font-bold text-xl leading-8 my-1">
                {selectUserGreeting(user.gender) + user.firstName + "!"}
              </h1>
              <h3 className="text-balada_violet_375 font-lg text-semibold leading-6">
                {user.email}
                <p className="text-sm text-balada_green_675 cursor-pointer">
                  alterar senha
                </p>
              </h3>
              <ul className="bg-gray-800 text-gray-400 p-5 mt-6 divide-y rounded shadow-sm h-auto">
                <li className="flex items-center py-3">
                  <span className="font-semibold text-sm text-balada_green_675">
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
                  <span className="font-semibold text-sm text-balada_green_675">
                    Data de cadastro:
                  </span>
                  <span className="ml-auto text-xs text-gray-100">
                    <DateFormatterWithHour timestamp={user.createdAt} />
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-semibold text-sm text-balada_green_675">
                    Gênero:
                  </span>
                  <span className="ml-auto text-xs text-gray-100">
                    {selectGender(user.gender)}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-semibold text-sm text-balada_green_675">
                    Data de nascimento:
                  </span>
                  <span className="ml-auto text-xs text-gray-100">
                    <DateFormatter timestamp={user.birthDate} />
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-semibold text-sm text-balada_green_675">
                    CPF:
                  </span>
                  <span className="ml-auto text-xs text-gray-100">
                    {mask(user.documentNumber, ["999.999.999-99"])}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className="font-semibold text-sm text-balada_green_675">
                    Celular:
                  </span>
                  <span className="ml-auto text-xs text-gray-100">
                    {mask(user.phone, ["(99) 99999-9999"])}
                  </span>
                </li>
                <li className="flex items-center py-3 flex-wrap">
                  <span className="font-semibold text-sm text-balada_green_675">
                    Endereço:
                  </span>
                  <table className="text-xs mt-3 text-gray-100 w-full">
                    <tbody className="flex flex-wrap w-full">
                      <tr className="flex items-start mr-4 gap-1">
                        <td className="font-semibold text-sm text-gray-100 relative before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2">
                          CEP:
                        </td>
                        <td className="m-0.5 text-xs">{user.address.cep}</td>
                      </tr>
                      <tr className="flex mr-4 gap-1 ml-3.5">
                        <td className="font-semibold text-sm text-gray-100 relative before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2">
                          Rua:
                        </td>
                        <td className="m-0.5 text-right text-xs">
                          {user.address.street}
                        </td>
                      </tr>
                      <tr className="flex items-start mr-4 gap-1">
                        <td className="font-semibold text-sm text-gray-100 relative before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2">
                          Número:
                        </td>
                        <td className="m-0.5 text-xs">{user.address.number}</td>
                      </tr>
                      <tr className="flex gap-1 ml-7">
                        <td className="font-semibold text-sm text-gray-100 text-right relative before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2">
                          Estado:
                        </td>
                        <td className="m-0.5 text-right text-xs">
                          {user.address.state}
                        </td>
                      </tr>
                      <tr className="flex items-start mr-4 gap-1">
                        <td className="font-semibold text-sm text-gray-100 relative before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2">
                          Cidade:
                        </td>
                        <td className="m-0.5 text-xs">{user.address.city}</td>
                      </tr>
                      <tr className="flex gap-1 ml-3">
                        <td className="font-semibold text-sm text-gray-100 text-right relative before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2">
                          Bairro:
                        </td>
                        <td className="m-0.5 text-right text-xs">
                          {user.address.neighborhood}
                        </td>
                      </tr>
                      <tr className="flex items-start mr-4 gap-1">
                        <td className="font-semibold text-sm text-gray-100 relative before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2">
                          Complemento:
                        </td>
                        <td className="m-0.5 text-xs">
                          {user.address.complement}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-8/12">
            <div className="py-14">
              <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-balada_green_675">
                  Meus eventos
                </h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
                  Confira os detalhes dos ingressos dos seus eventos
                </p>
              </div>
              <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full">
                  <div className="flex flex-col justify-start items-start bg-gray-800 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                      Eventos confirmados
                    </p>
                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                      <div className=" w-64 h-32">
                        <FullSizeImage src={brega} alt="Descrição da imagem" />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            Brega Light
                          </h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Style:{" "}
                              </span>{" "}
                              Italic Minimal Design
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Size:{" "}
                              </span>{" "}
                              Small
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Color:{" "}
                              </span>{" "}
                              Light Blue
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base dark:text-white xl:text-lg leading-6">
                            $36.00{" "}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            01
                          </p>
                          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                            $36.00
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                      <div className="w-64 h-32">
                        <FullSizeImage
                          src={safadao}
                          alt="Descrição da imagem"
                        />
                      </div>
                      <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                            Reveillon Axé Moí 2025
                          </h3>
                          <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Style:{" "}
                              </span>{" "}
                              Italic Minimal Design
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Size:{" "}
                              </span>{" "}
                              Small
                            </p>
                            <p className="text-sm dark:text-white leading-none text-gray-800">
                              <span className="dark:text-gray-400 text-gray-300">
                                Color:{" "}
                              </span>{" "}
                              Light Blue
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base dark:text-white xl:text-lg leading-6">
                            $20.00{" "}
                          </p>
                          <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
                            01
                          </p>
                          <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                            $20.00
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
