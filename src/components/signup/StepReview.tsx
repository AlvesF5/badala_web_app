import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState } from "react";
import {
  formatedDate,
  formatedCPF,
  formatedNumber,
  selectGender,
} from "@/utils/Functions";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: any;
  onClose: any;
  children: any;
  title: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-balada_gray_900 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="rounded-lg shadow-lg w-10/12 md:w-4/12 bg-balada_gray_600">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white px-2">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};

export default function StepReview({
  data,
  register,
  errors,
  setValue,
  getValues,
}: {
  data: any;
  register: any;
  errors: any;
  setValue: any;
  getValues: any;
}) {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eye);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isChecked, setIsChecked] = useState(false);

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
    setValue('agree', !isChecked, { shouldValidate: true });
  };

  const uncheckCheckbox = () => {
    setIsChecked(false);
    setValue('agree', false, { shouldValidate: true });
    closeModal()
  };

  const checkCheckbox = () => {
    setIsChecked(true);
    setValue('agree', true, { shouldValidate: true });
    closeModal()
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
              <h3 className="text-lg leading-6 font-medium text-balada_violet_500">
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
                    <dt className="text-sm font-medium text-balada_violet_500 col-span-2">
                      Nome:
                    </dt>
                    <dd className="text-sm text-white sm:mt-0 sm:col-span-2 flex justify-start">
                      {data.firstName} {data.lastName}
                    </dd>
                  </div>
                  <div className="flex gap-1 md:gap-3 col-span-3 justify-end">
                    <dt className="text-sm font-medium text-balada_violet_500 col-span-1">
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
                    <dt className="text-sm font-medium text-balada_violet_500">
                      Celular:
                    </dt>
                    <dd className="text-sm text-white col-span-1 flex justify-start">
                      {formatedNumber(data.phone)}
                    </dd>
                  </div>
                  <div className=" flex gap-1 md:gap-2 md:col-span-2 col-span-3">
                    <dt className="text-sm font-medium text-balada_violet_500  flex justify-end ml-6">
                      Gênero:
                    </dt>
                    <dd className="text-sm text-white flex">
                      {selectGender(data.gender)}
                    </dd>
                  </div>
                  <div className=" flex gap-1 md:gap-2 md:col-span-2 col-span-4 md:justify-end mt-4 md:mt-0">
                    <dt className="text-sm font-medium text-balada_violet_500">
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
                  <div className=" flex gap-2">
                    <dt className="text-sm font-medium text-balada_violet_500">
                      Endereço:
                    </dt>
                    <dd className="text-sm text-white col-span-1 flex justify-end">
                      {data.street} Nº {data.number}, Complemento:{" "}
                      {data.complement}, Bairro: {data.neighborhood}, Cidade:{" "}
                      {data.city}-{data.state}, CEP: {data.cep}
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
                <label className="text-balada_green_900 cursor-pointer -mt-0.5">
                  <span
                    onClick={openModal}
                  >
                    termos de uso.
                  </span>
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

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
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
