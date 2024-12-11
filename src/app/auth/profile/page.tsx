"use client";

import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import { JwtPayload } from "@/utils/AuthServer";
import brega from "../../../images/sliderhome/brega.jpg";
import safadao from "../../../images/sliderhome/safadao.jpg";
import DateFormatterWithHour from "@/components/utils/DateFormaterWithHour";
import FullSizeImage from "@/components/utils/FullSizeImage";
import DateFormatter from "@/components/utils/DateFormater";
import { mask } from "remask";
import {
  selectGender,
  selectUserStatus,
  selectUserGreeting,
} from "@/Utils/Functions";
import { FieldError, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaUserUpdate, schemaUserUpdatePassword } from "@/utils/schemas";
import Modal, { useModal } from "@/components/modal/DefaultModal";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { handleToggle } from "../../../utils/togglePasswordVisibility";
import { useAuth } from "@/Utils/AuthClient";
import { useRouter } from "next/navigation";
import {
  UserDetails,
  UserUpdate,
  UpdateUserPassword,
} from "@/components/utils/Types";
import { states, minimumAge } from "@/components/utils/Variables";
import { convertDate } from "@/components/utils/Functions";
import {
  getUserById,
  updateUser,
  updateUserPassword,
  sendEmailVerification,
  isEmailVerified
} from "@/services/userProfileService";

minimumAge.setFullYear(minimumAge.getFullYear() - 14);

const UserProfile = () => {
  const [userId, setUserId] = useState<string>("");
  const [addressId, setAddressId] = useState<string>("");
  const { get } = useCookies();
  const token = get("balada-user-token") || "";
  const [user, setUser] = useState<UserUpdate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);
  const router = useRouter();
  const [userActive, setUserActive] = useState<boolean | null>(null);

  const methods = useForm<UserUpdate>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schemaUserUpdate),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const methodsUpdatePassword = useForm<UpdateUserPassword>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schemaUserUpdatePassword),
  });

  const {
    handleSubmit: handleSubmitUpdatePassword,
    register: registerUpdatePassword,
    formState: { errors: errorsUpdatePassword },
  } = methodsUpdatePassword;

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      console.log(decodedToken);
      setUserId(decodedToken.user_id);

      const checkAuth = async () => {
        const authStatus = await isAuthenticated();
        if (!authStatus) {
          router.push("/login");
        }
      };
      checkAuth();

      const fetchUser = async () => {
        const userData = await getUserById(decodedToken.user_id);
        if (userData) {
          setUser(userData);
          setAddressId(userData.address.id);
          setUserDetails(userData);
        }
        const emailVerified = await isEmailVerified(token)
        setUserActive(emailVerified);
      };

      fetchUser();
    } catch (error) {
      console.error("Invalid token:", error);
      router.push("/login");
    }
  }, [token, isAuthenticated, router]);

  const handleEditClick = () => {
    if (isEditing) {
      setUserDetails(userDetails);
    }
    setIsEditing(!isEditing);
  };

  const onSubmit = async (data: UserUpdate) => {
    console.log("Chamou o onSubmit!");
    console.log(data);
    console.log("Data passada no onSubmit: " + data.birthDate);

    // Atualiza o usuário com a data de nascimento no formato correto
    const success = await updateUser(userId, data);

    if (success) {
      const userData = await getUserById(userId);
      if (userData) {
        setUser(userData);
        setUserDetails(userData); // Atualiza o estado userDetails com os novos dados
      }
      setIsEditing(false);
    }
  };

  const onSubmitUpdateUserPassword = async (data: UpdateUserPassword) => {
    updateUserPassword(data);
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="text-center md:h-screen flex justify-center items-center w-full mx-auto">
      <div className="container mx-auto w-4/12 flex">
        <div className="md:flex no-wrap md:-mx-2 w-f mx-auto justify-center">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="py-14 px-4">
              <h1 className="text-balada_green_800 font-bold text-xl leading-8 my-1">
                {selectUserGreeting(user.gender) + user.firstName + "!"}
              </h1>
              <h3 className=" text-gray-200 text-sm text-semibold leading-6">
                {userDetails?.email}
                <p
                  className="text-sm text-balada_green_675 cursor-pointer"
                  onClick={openModal}
                >
                  {" "}
                  alterar senha{" "}
                </p>
              </h3>
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Alteração de senha"}
              >
                <div className="p-2 md:p-5 space-y-2">
                  <FormProvider {...methodsUpdatePassword}>
                    <form
                      onSubmit={handleSubmitUpdatePassword(
                        onSubmitUpdateUserPassword
                      )}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            {...registerUpdatePassword("email")}
                            type="email"
                            onChange={(e) => e.target.value}
                            name="email"
                            id="email"
                            className="input_default_one_line peer"
                          />
                          <label
                            htmlFor="email"
                            className="label_input_default_one_line left-0"
                          >
                            Email
                          </label>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div>
                          <div className="mb-4 relative z-0 w-full group flex flex-col">
                            <input
                              {...registerUpdatePassword("password")}
                              type={type}
                              name="password"
                              id="password"
                              onChange={(e) => e.target.value}
                              className="input_default_one_line peer"
                            />
                            <label
                              htmlFor="password"
                              className="label_input_default_one_line"
                            >
                              Senha
                            </label>
                          </div>
                        </div>

                        <div className="mb-4 relative z-0 w-full group flex">
                          <input
                            type={type}
                            {...registerUpdatePassword("newPassword")}
                            name="newPassword"
                            id="newPassword"
                            onChange={(e) => e.target.value}
                            autoComplete="current-password"
                            className="input_default_one_line peer"
                          />
                          <label
                            htmlFor="newPassword"
                            className="label_input_default_one_line"
                          >
                            Nova Senha
                          </label>
                          <span
                            className="flex justify-around items-center text-gray-400"
                            onClick={() =>
                              handleToggle(type, setType, setIcon, eye, eyeOff)
                            }
                          >
                            <Icon
                              className="absolute mr-5"
                              icon={icon}
                              size={20}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center border-gray-200 rounded-b dark:border-gray-600 w-full">
                        <button
                          type="submit"
                          // aria-disabled={pending}
                          className=" bg-balada_green_900 py-1 px-2 text-white rounded-md h-12 hover:bg-balada_violet_500 uppercase w-full"
                        >
                          Alterar senha
                        </button>
                      </div>
                      <div className="div_container_form_errors">
                        {errorsUpdatePassword?.email && (
                          <span className="label_error_input_forms">
                            {errorsUpdatePassword.email.message}
                          </span>
                        )}
                        {errorsUpdatePassword?.password && (
                          <span className="label_error_input_forms">
                            {errorsUpdatePassword.password.message}
                          </span>
                        )}
                        {errorsUpdatePassword?.newPassword && (
                          <span className="label_error_input_forms">
                            {errorsUpdatePassword.newPassword.message}
                          </span>
                        )}
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </Modal>
              <div className="bg-gray-800">
                <ul className="text-gray-400 p-5 mt-6 h-auto">
                  <li className="flex items-center py-3">
                    <span className="font-semibold text-xs text-balada_green_675">
                      {" "}
                      Status:{" "}
                    </span>
                    <span className="ml-auto">
                      <span
                        className={`py-1 px-2 rounded text-white text-sm ${
                          userActive ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {selectUserStatus(userActive!!)}
                      </span>
                    </span>
                  </li>
                  {!userActive && (
                    <li className="flex mb-4 w-full justify-end cursor-pointer hover:text-balada_green_675">
                      <div
                        className=" flex float-end text-xs"
                        onClick={() => sendEmailVerification(token)}
                      >
                        enviar link de ativação por e-mail
                      </div>
                    </li>
                  )}
                  <li className="flex items-center py-3">
                    <span className="font-semibold text-xs text-balada_green_675">
                      {" "}
                      Data de cadastro:{" "}
                    </span>
                    <span className="ml-auto text-xs text-gray-100">
                      <DateFormatterWithHour
                        timestamp={userDetails?.createdAt}
                      />
                    </span>
                  </li>
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <li className="flex items-center py-3">
                        <span className="font-semibold text-xs text-balada_green_675">
                          {" "}
                          Nome:{" "}
                        </span>
                        <span className="ml-auto text-xs text-gray-100">
                          {isEditing ? (
                            <input
                              type="text"
                              {...register("firstName")}
                              onChange={(e) => e.target.value}
                              name="firstName"
                              id="firstName"
                              defaultValue={user.firstName}
                              className="bg-gray-700 text-white p-1 rounded"
                            />
                          ) : (
                            user.firstName
                          )}
                          {errors.firstName && (
                            <p>{(errors.firstName as FieldError).message}</p>
                          )}
                        </span>
                      </li>
                      <li className="flex items-center py-3">
                        <span className="font-semibold text-xs text-balada_green_675">
                          {" "}
                          Sobrenome:{" "}
                        </span>
                        <span className="ml-auto text-xs text-gray-100">
                          {isEditing ? (
                            <input
                              type="text"
                              {...register("lastName")}
                              onChange={(e) => e.target.value}
                              name="lastName"
                              id="lastName"
                              defaultValue={user.lastName}
                              className="bg-gray-700 text-white p-1 rounded"
                            />
                          ) : (
                            user.lastName
                          )}
                          {errors.lastName && (
                            <p>{(errors.lastName as FieldError).message}</p>
                          )}
                        </span>
                      </li>
                      <li className="flex items-center py-3">
                        <span className="font-semibold text-xs text-balada_green_675">
                          {" "}
                          Gênero:{" "}
                        </span>
                        <span className="ml-auto text-xs text-gray-100">
                          {isEditing ? (
                            <select
                              {...register("gender")}
                              onChange={(e) => e.target.value}
                              name="gender"
                              id="gender"
                              className="select_input_default_one_line peer"
                              defaultValue={userDetails?.gender}
                            >
                              <option value={userDetails?.gender}>
                                {selectGender(userDetails?.gender || "")}
                              </option>
                              {userDetails?.gender !== "MA" && (
                                <option value="MA">Masculino</option>
                              )}
                              {userDetails?.gender !== "FE" && (
                                <option value="FE">Feminino</option>
                              )}
                              {userDetails?.gender !== "NB" && (
                                <option value="NB">Não Binário</option>
                              )}
                            </select>
                          ) : (
                            selectGender(user.gender)
                          )}
                          {errors?.gender && (
                            <p>{(errors.gender as FieldError).message}</p>
                          )}
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
                              name="birthDate"
                              id="birthDate"
                              defaultValue={convertDate(user.birthDate)}
                              className="bg-gray-700 text-white p-1 rounded"
                            />
                          ) : (
                            <DateFormatter timestamp={user.birthDate} />
                          )}
                          {errors.birthDate && (
                            <p>{(errors.birthDate as FieldError).message}</p>
                          )}
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
                              onChange={(e) => e.target.value}
                              name="documentNumber"
                              id="documentNumber"
                              defaultValue={
                                mask(userDetails?.documentNumber || "", [
                                  "999.999.999-99",
                                ]) || ""
                              }
                              className="bg-gray-700 text-white p-1 rounded"
                            />
                          ) : (
                            mask(user.documentNumber, ["999.999.999-99"])
                          )}
                          {errors.documentNumber && (
                            <p>
                              {(errors.documentNumber as FieldError).message}
                            </p>
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
                              onChange={(e) => e.target.value}
                              name="phone"
                              id="phone"
                              defaultValue={
                                mask(userDetails?.phone || "", [
                                  "(99) 99999-9999",
                                ]) || ""
                              }
                              className="bg-gray-700 text-white p-1 rounded"
                            />
                          ) : (
                            mask(user.phone, ["(99) 99999-9999"])
                          )}
                          {errors.phone && (
                            <p>{(errors.phone as FieldError).message}</p>
                          )}
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
                                    onChange={(e) => e.target.value}
                                    name="address.cep"
                                    id="address.cep"
                                    defaultValue={
                                      mask(userDetails?.address.cep || "", [
                                        "99999-999",
                                      ]) || ""
                                    }
                                    className="bg-gray-700 text-white p-1 rounded"
                                  />
                                ) : (
                                  user.address.cep
                                )}
                                {errors.address?.cep && (
                                  <p>
                                    {(errors.address.cep as FieldError).message}
                                  </p>
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
                                    onChange={(e) => e.target.value}
                                    name="address.street"
                                    id="address.street"
                                    defaultValue={
                                      userDetails?.address.street || ""
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
                                    onChange={(e) => e.target.value}
                                    name="address.number"
                                    id="address.number"
                                    defaultValue={
                                      userDetails?.address.number || ""
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
                                Estado:
                              </td>
                              <td className="m-0.5 text-right text-xs">
                                {isEditing ? (
                                  <select
                                    {...register("address.state")}
                                    onChange={(e) => e.target.value}
                                    name="address.state"
                                    id="address.state"
                                    className="bg-gray-700 text-white p-1 rounded"
                                    defaultValue={userDetails?.address.state}
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
                                      state.value === userDetails?.address.state
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
                                    onChange={(e) => e.target.value}
                                    name="address.city"
                                    id="address.city"
                                    defaultValue={
                                      userDetails?.address.city || ""
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
                                    onChange={(e) => e.target.value}
                                    name="address.neighborhood"
                                    id="address.neighborhood"
                                    defaultValue={
                                      userDetails?.address.neighborhood || ""
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
                                    onChange={(e) => e.target.value}
                                    name="address.complement"
                                    id="address.complement"
                                    defaultValue={
                                      userDetails?.address.complement || ""
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

                      {isEditing && (
                        <button
                          type="submit"
                          className="bg-balada_green_675 text-white py-2 px-4 rounded"
                        >
                          Salvar
                        </button>
                      )}
                      {!isEditing && (
                        <button
                          onClick={handleEditClick}
                          className="bg-balada_green_675 text-white py-2 px-4 rounded hover:bg-balada_violet_500"
                        >
                          Editar
                        </button>
                      )}
                      <input
                        type="text"
                        hidden
                        {...register("address.id")}
                        name="address.id"
                        id="address.id"
                        defaultValue={addressId || ""}
                        className="bg-gray-700 text-white p-1 rounded"
                      />
                    </form>
                  </FormProvider>
                </ul>
              </div>
            </div>
          </div>
          <div className="md:w-8/12 w-full px-4">
            <div className="md:py-14">
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
                    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800 mb-6 md:mb-0">
                      Eventos confirmados
                    </p>
                    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                      <div className=" md:w-64 md:h-32 w-full h-48">
                        <FullSizeImage src={brega} alt="Descrição da imagem" />
                      </div>
                      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0 mt-4">
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
                      <div className="md:w-64 md:h-32 w-full h-48">
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
