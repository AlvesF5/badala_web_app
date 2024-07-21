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
import { mask, unMask } from "remask";
import {
  selectGender,
  selectUserStatus,
  selectUserGreeting,
} from "@/utils/Functions";
import brega from "../../images/sliderhome/brega.jpg";
import safadao from "../../images/sliderhome/safadao.jpg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { schemaUserPersonalInfo } from "@/utils/schemas";
import { parse, format, isValid as isValidDate } from "date-fns";
import { ptBR } from "date-fns/locale";

const minimumAge = new Date();
minimumAge.setFullYear(minimumAge.getFullYear() - 14);

type User = z.infer<typeof schemaUserPersonalInfo> & {
  email: string;
  birthDate: string;
  password: string;
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
    console.log(`Status da resposta: ${response.status}`);
    if (!response.ok) {
      const errorJson = await response.json();
      const errorMessage = errorJson.errors
        ? errorJson.errors.join(", ")
        : "Erro desconhecido";
      toast.error(`Erro ao obter o usuário: ${errorMessage}`);
      return null;
    }
    const responseText = await response.text();
    console.log(`Conteúdo da resposta: ${responseText}`);
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
  const token = get("balada-user-token") || "";
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    resolver: zodResolver(schemaUserPersonalInfo),
  });

  const updateUser = async () => {
    if(isValid){
      try {
        console.log("Formulário está válido?" + isValid);
          const response = await fetch(`http://localhost:8080/v1/user/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName: user?.firstName,
              lastName: user?.lastName,
              phone: unMask(user?.phone || ""),
              birthDate: user?.birthDate,
              documentNumber: unMask(user?.documentNumber || ""),
              gender: user?.gender,
              address: {
                cep: unMask(user?.address.cep || ""),
                street: user?.address.street,
                number: user?.address.number,
                state: user?.address.state,
                city: user?.address.city,
                neighborhood: user?.address.neighborhood,
                complement: user?.address.complement,
              },
            }),
          });
          if (!response.ok) {
            const errorJson = await response.json();
            const errorMessage = errorJson.errors
              ? errorJson.errors.join(", ")
              : "Erro desconhecido";
            toast.error(`Erro ao atualizar o usuário: ${errorMessage}`);
            return false;
          }
          toast.success("Usuário atualizado com sucesso!");
          return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(`Erro ao atualizar o usuário: ${error.message}`);
        } else {
          console.log("Ocorreu um erro desconhecido");
        }
        return false;
      }
    }

  };

  const handleEditClick = () => {
    if (isEditing) {
      console.log(editableUser);
      setUser(editableUser);
    }
    setIsEditing(!isEditing);
  };

  const convertDate = (dateString: string): string => {
    // Parse the date string using the format and locale
    const parsedDate = parse(
      dateString,
      "d 'de' MMMM 'de' yyyy 'às' HH:mm:ss 'UTC'XXX",
      new Date(),
      { locale: ptBR }
    );

    // Check if the parsed date is valid
    if (!isValidDate(parsedDate)) {
      throw new RangeError("Invalid time value");
    }

    // Format the parsed date to the desired format
    return format(parsedDate, "yyyy-MM-dd");
  };

  const formattedDate =
    user && user.birthDate ? convertDate(user.birthDate) : "";

  const states = [
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
    { value: "EX", label: "Estrangeiro" },
  ];

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
          setEditableUser(userData);
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
              <h3 className=" text-gray-200 text-sm text-semibold leading-6">
                {user.email}
                <p className="text-sm text-balada_green_675 cursor-pointer">
                  {" "}
                  alterar senha{" "}
                </p>
              </h3>
              <div className="bg-gray-800">
                <ul className="text-gray-400 p-5 mt-6 divide-y rounded shadow-sm h-auto">
                  <li className="flex items-center py-3">
                    <span className="font-semibold text-xs text-balada_green_675">
                      {" "}
                      Status:{" "}
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
                    <span className="font-semibold text-xs text-balada_green_675">
                      {" "}
                      Data de cadastro:{" "}
                    </span>
                    <span className="ml-auto text-xs text-gray-100">
                      <DateFormatterWithHour timestamp={user.createdAt} />
                    </span>
                  </li>
                  <form >
                    <li className="flex items-center py-3">
                      <span className="font-semibold text-xs text-balada_green_675">
                        {" "}
                        Gênero:{" "}
                      </span>
                      <span className="ml-auto text-xs text-gray-100">
                        {isEditing ? (
                          <select
                            {...register("gender")}
                            name="gender"
                            id="gender"
                            className="select_input_default_one_line peer"
                            defaultValue={editableUser?.gender}
                          >
                            <option selected value={editableUser?.gender}>
                              {selectGender(editableUser?.gender || "")}
                            </option>
                            {editableUser?.gender !== "MA" && (
                              <option value="MA">Masculino</option>
                            )}
                            {editableUser?.gender !== "FE" && (
                              <option value="FE">Feminino</option>
                            )}
                            {editableUser?.gender !== "NB" && (
                              <option value="NB">Não Binário</option>
                            )}
                          </select>
                        ) : (
                          selectGender(user.gender)
                        )}
                        {errors.gender && <p>{errors.gender.message}</p>}
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span className="font-semibold text-xs text-balada_green_675">
                        {" "}
                        Data de nascimento:{" "}
                      </span>
                      <span className="ml-auto text-xs text-gray-100">
                        {isEditing ? (
                          <input
                            type="date"
                            {...register("birthDate")}
                            defaultValue={formattedDate}
                            className="bg-gray-700 text-white p-1 rounded"
                          />
                        ) : (
                          <DateFormatter timestamp={user.birthDate} />
                        )}
                        {errors.birthDate && <p>{errors.birthDate.message}</p>}
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span className="font-semibold text-xs text-balada_green_675">
                        {" "}
                        CPF:{" "}
                      </span>
                      <span className="ml-auto text-xs text-gray-100">
                        {isEditing ? (
                          <input
                            type="text"
                            {...register("documentNumber")}
                            defaultValue={
                              mask(editableUser?.documentNumber || "", [
                                "999.999.999-99",
                              ]) || ""
                            }
                            className="bg-gray-700 text-white p-1 rounded"
                          />
                        ) : (
                          mask(user.documentNumber, ["999.999.999-99"])
                        )}
                        {errors.documentNumber && (
                          <p>{errors.documentNumber.message}</p>
                        )}
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span className="font-semibold text-xs text-balada_green_675">
                        {" "}
                        Celular:{" "}
                      </span>
                      <span className="ml-auto text-xs text-gray-100">
                        {isEditing ? (
                          <input
                            type="text"
                            {...register("phone")}
                            defaultValue={
                              mask(editableUser?.phone || "", [
                                "(99) 99999-9999",
                              ]) || ""
                            }
                            className="bg-gray-700 text-white p-1 rounded"
                          />
                        ) : (
                          mask(user.phone, ["(99) 99999-9999"])
                        )}
                        {errors.phone && <p>{errors.phone.message}</p>}
                      </span>
                    </li>
                    <li className="flex items-center py-3 flex-wrap">
                      <span className="font-semibold text-xs text-balada_green_675">
                        {" "}
                        Endereço:{" "}
                      </span>
                      <table className="text-xs mt-3 text-gray-100 w-full">
                        <tbody className="flex flex-wrap w-full px-3">
                          <tr className="flex items-start mr-4 gap-1">
                            <td
                              className={`font-semibold text-xs text-gray-100 relative ${
                                isEditing
                                  ? "before:content-none"
                                  : "before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2"
                              }`}
                            >
                              CEP:
                            </td>
                            <td className="m-0.5 text-xs">
                              {isEditing ? (
                                <input
                                  type="text"
                                  {...register("address.cep")}
                                  defaultValue={
                                    mask(editableUser?.address.cep || "", [
                                      "99999-999",
                                    ]) || ""
                                  }
                                  className="bg-gray-700 text-white p-1 rounded"
                                />
                              ) : (
                                user.address.cep
                              )}
                              {errors.address?.cep && (
                                <p>{errors.address.cep.message}</p>
                              )}
                            </td>
                          </tr>
                          <tr
                            className={`flex mr-4 gap-1 ${
                              isEditing ? "ml-0" : " ml-3.5"
                            }`}
                          >
                            <td
                              className={`font-semibold text-xs text-gray-100 relative ${
                                isEditing
                                  ? "before:content-none"
                                  : "before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2"
                              }`}
                            >
                              Rua:
                            </td>
                            <td className="m-0.5 text-right text-xs">
                              {isEditing ? (
                                <input
                                  type="text"
                                  {...register("address.street")}
                                  defaultValue={
                                    editableUser?.address.street || ""
                                  }
                                  className="bg-gray-700 text-white p-1 rounded"
                                />
                              ) : (
                                user.address.street
                              )}
                              {errors.address?.street && (
                                <p>{errors.address.street.message}</p>
                              )}
                            </td>
                          </tr>
                          <tr className="flex items-start mr-4 gap-1">
                            <td
                              className={`font-semibold text-xs text-gray-100 relative ${
                                isEditing
                                  ? "before:content-none"
                                  : "before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2"
                              }`}
                            >
                              Número:
                            </td>
                            <td className="m-0.5 text-xs">
                              {isEditing ? (
                                <input
                                  type="text"
                                  {...register("address.number")}
                                  defaultValue={
                                    editableUser?.address.number || ""
                                  }
                                  className="bg-gray-700 text-white p-1 rounded"
                                />
                              ) : (
                                user.address.number
                              )}
                              {errors.address?.number && (
                                <p>{errors.address.number.message}</p>
                              )}
                            </td>
                          </tr>
                          <tr
                            className={`flex mr-4 gap-1 ${
                              isEditing ? "ml-0" : " ml-8"
                            }`}
                          >
                            <td
                              className={`font-semibold text-xs text-gray-100 relative ${
                                isEditing
                                  ? "before:content-none"
                                  : "before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2"
                              }`}
                            >
                              Estato:
                            </td>
                            <td className="m-0.5 text-right text-xs">
                              {isEditing ? (
                                <select
                                  {...register("address.state")}
                                  name="state"
                                  id="state"
                                  className="bg-gray-700 text-white p-1 rounded"
                                  defaultValue={editableUser?.address.state}
                                >
                                  {states.map((state) => (
                                    <option
                                      key={state.value}
                                      value={state.value}
                                    >
                                      {state.label}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                states.find(
                                  (state) =>
                                    state.value === editableUser?.address.state
                                )?.label
                              )}
                              {errors.address?.state && (
                                <p>{errors.address.state.message}</p>
                              )}
                            </td>
                          </tr>
                          <tr className="flex items-start mr-4 gap-1">
                            <td
                              className={`font-semibold text-xs text-gray-100 relative ${
                                isEditing
                                  ? "before:content-none"
                                  : "before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2"
                              }`}
                            >
                              Cidade:
                            </td>
                            <td className="m-0.5 text-xs">
                              {isEditing ? (
                                <input
                                  type="text"
                                  {...register("address.city")}
                                  defaultValue={
                                    editableUser?.address.city || ""
                                  }
                                  className="bg-gray-700 text-white p-1 rounded"
                                />
                              ) : (
                                user.address.city
                              )}
                              {errors.address?.city && (
                                <p>{errors.address.city.message}</p>
                              )}
                            </td>
                          </tr>
                          <tr
                            className={`flex mr-4 gap-1 ${
                              isEditing ? "ml-0" : " ml-3.5"
                            }`}
                          >
                            <td
                              className={`font-semibold text-xs text-gray-100 relative ${
                                isEditing
                                  ? "before:content-none"
                                  : "before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2"
                              }`}
                            >
                              Bairro:
                            </td>
                            <td className="m-0.5 text-right text-xs">
                              {isEditing ? (
                                <input
                                  type="text"
                                  {...register("address.neighborhood")}
                                  defaultValue={
                                    editableUser?.address.neighborhood || ""
                                  }
                                  className="bg-gray-700 text-white p-1 rounded"
                                />
                              ) : (
                                user.address.neighborhood
                              )}
                              {errors.address?.neighborhood && (
                                <p>{errors.address.neighborhood.message}</p>
                              )}
                            </td>
                          </tr>
                          <tr className="flex items-start mr-4 gap-1">
                            <td
                              className={`font-semibold text-xs text-gray-100 relative ${
                                isEditing
                                  ? "before:content-none"
                                  : "before:content-['•'] before:mr-2 before:text-balada_green_675 before:absolute before:-left-2 before:top-1/2 before:transform before:-translate-y-1/2"
                              }`}
                            >
                              Complemento:
                            </td>
                            <td className="m-0.5 text-xs">
                              {isEditing ? (
                                <input
                                  type="text"
                                  {...register("address.complement")}
                                  defaultValue={
                                    editableUser?.address.complement || ""
                                  }
                                  className="bg-gray-700 text-white p-1 rounded"
                                />
                              ) : (
                                user.address.complement
                              )}
                              {errors.address?.complement && (
                                <p>{errors.address.complement.message}</p>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                    <div className="pb-6 pr-5 -mt-4 flex justify-end bg-gray-800 w-full">
                      {isEditing && (
                        <button
                          type="submit"
                          onClick={updateUser}
                          className="bg-balada_green_675 text-white py-2 px-4 rounded"
                        >
                          Salvar
                        </button>
                      )}
                      {!isEditing && (
                        <button
                          onClick={handleEditClick}
                          className="bg-balada_green_675 text-white py-2 px-4 rounded"
                        >
                          Editar
                        </button>
                      )}
                    </div>
                  </form>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-8/12">
            <div className="py-14">
              <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-2xl font-semibold leading-7 lg:leading-9 text-balada_green_675">
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
