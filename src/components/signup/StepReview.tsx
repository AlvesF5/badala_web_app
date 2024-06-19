import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";
import { mask } from "remask";
import {
  formatedDate,
  formatedCPF,
  formatedNumber,
  selectGender,
} from "@/utils/Functions";
import Modal, { useModal } from "@/components/modal/DefaultModal";

export default function StepReview({
  data,
  register,
  errors,
  setValue,
}: {
  data: any;
  register: any;
  errors: any;
  setValue: any;
}) {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);
  const [isChecked, setIsChecked] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eyeOff);
      setType("text");
    } else {
      setIcon(eye);
      setType("password");
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setValue("agree", !isChecked, { shouldValidate: true });
  };

  const uncheckCheckbox = () => {
    setIsChecked(false);
    setValue("agree", false, { shouldValidate: true });
    closeModal();
  };

  const checkCheckbox = () => {
    setIsChecked(true);
    setValue("agree", true, { shouldValidate: true });
    closeModal();
  };

  return (
    <div>
      <main className=" flex w-full mx-auto justify-center items-center h-full">
        <div className="w-full h-full flex flex-col justify-center">
          <div className="flex flex-col gap-8 text-white">
            Por favor, revise seus dados antes de enviar!
          </div>
          <div className=" bg-balada_gray_800 overflow-hidden">
            <div className=" py-4">
              <h3 className="text-lg leading-6 font-medium text-balada_violet_375">
                Email e senha
              </h3>
              <div className=" py-2 sm:gap-4 flex justify-between">
                <dt className="text-sm font-medium text-white">{data.email}</dt>
                <dd className="mt-1 text-sm text-white sm:mt-0 flex justify-end right-0">
                  <span className="flex gap-2" onClick={handleToggle}>
                    <div className="flex gap-5">
                      <div>
                        <input
                          type={type}
                          name="password"
                          value={data.password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          className="text-white w-full bg-balada_gray_800 text-right"
                        />
                      </div>
                      <div>
                        <Icon
                          className="absolute -ml-4"
                          icon={icon}
                          size={20}
                        />
                      </div>
                    </div>

                    <div></div>
                  </span>
                </dd>
              </div>
            </div>
            <div className="border-t border-gray-600 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-2 sm:py-5 grid grid-cols-6">
                  <div className=" flex gap-1 md:gap-2 col-span-3">
                    <dt className="text-sm font-semibold text-balada_violet_375 col-span-2">
                      Nome:
                    </dt>
                    <dd className="text-sm text-white sm:mt-0 sm:col-span-2 flex justify-start">
                      {data.firstName} {data.lastName}
                    </dd>
                  </div>
                  <div className="flex gap-1 md:gap-3 col-span-3 justify-end">
                    <dt className="text-sm font-semibold text-balada_violet_375 col-span-1">
                      CPF:
                    </dt>
                    <dd className="text-sm text-white sm:mt-0 sm:col-span-1 flex justify-end">
                      {formatedCPF(data.documentNumber)}
                    </dd>
                  </div>
                </div>
              </dl>
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-2 grid grid-cols-6">
                  <div className=" flex gap-1 md:gap-2 md:col-span-2 col-span-3">
                    <dt className="text-sm font-semibold text-balada_violet_375">
                      Celular:
                    </dt>
                    <dd className="text-sm text-white col-span-1 flex justify-start">
                      {formatedNumber(data.phone)}
                    </dd>
                  </div>
                  <div className=" flex gap-1 md:gap-2 md:col-span-2 col-span-3">
                    <dt className="text-sm font-semibold text-balada_violet_375  flex justify-end ml-6">
                      Gênero:
                    </dt>
                    <dd className="text-sm text-white flex">
                      {selectGender(data.gender)}
                    </dd>
                  </div>
                  <div className=" flex gap-1 md:gap-2 md:col-span-2 col-span-4 md:justify-end mt-4 md:mt-0">
                    <dt className="text-sm font-semibold text-balada_violet_375">
                      Data Nascimento:
                    </dt>
                    <dd className="text-sm text-white col-span-1 flex md:justify-end">
                      {formatedDate(data.birthDate)}
                    </dd>
                  </div>
                </div>
              </dl>
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-2 sm:py-5">
                  <div className="flex gap-2">
                    <dt className="text-sm font-semibold text-balada_violet_375">
                      Endereço:
                    </dt>
                    <dd className="text-sm text-white col-span-1 flex flex-wrap gap-2">
                      <p className=" text-balada_green_675">Logradouro: </p>
                      {data.street} <p className=" text-balada_green_675">Nº</p>{" "}
                      {data.number},
                      {data.complement && (
                        <p className=" text-balada_green_675">
                          Complemento: <span className="text-white">{data.complement},</span>{" "}
                        </p>
                      )}{" "}
                      <p className=" text-balada_green_675">Bairro:</p>{" "}
                      {data.neighborhood},{" "}
                      <p className=" text-balada_green_675">Cidade:</p>{" "}
                      {data.city}-{data.state},{" "}
                      <p className=" text-balada_green_675">CEP:</p> {mask(data?.cep, ['99999-999'])}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>

          <div className="flex flex-col justify-center w-full items-center gap-2">
            <div className="flex gap-2 w-full justify-center items-center">
              <input
                {...register("agree")}
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                id="agree"
                name="agree"
              />
              <div className="flex gap-1">
                <label htmlFor="agree" className=" text-sm text-white">
                  Ao continuar você concorda com os{" "}
                </label>
                <label className="text-balada_green_900 cursor-pointer">
                  <p onClick={openModal}>termos de uso.</p>
                </label>
              </div>
            </div>
            {errors?.agree && (
              <span className=" text-red-500 text-sm top-12">
                {errors.agree.message}
              </span>
            )}
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={"Termos de uso"}
          >
            <div className="p-2 md:p-5 space-y-2">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                With less than a month to go before the European Union enacts
                new consumer privacy laws for its citizens, companies around the
                world are updating their terms of service agreements to comply.
              </p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The European Union’s General Data Protection Regulation
                (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                common set of data rights in the European Union. It requires
                organizations to notify users as soon as possible of high-risk
                data breaches that could personally affect them.
              </p>
            </div>

            <div className="flex items-center md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 w-full">
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={checkCheckbox}
                className="text-white bg-balada_green_900 hover:bg-balada_green_900 focus:ring-4 focus:outline-none focus:balade_green_800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-balada_green_900 dark:hover:bg-balada_green_900 dark:focus:balada_green_800"
              >
                Aceitar
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={uncheckCheckbox}
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Rejeitar
              </button>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
}
