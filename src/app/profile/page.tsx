"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import { useCookies } from "next-client-cookies";
import profile from "../../images/profile.png";
import Image from "next/image";

const Profile = () => {
  const token = useCookies().get("balada-user-token");
  const [open, setOpen] = useState(false);

  if (!token) {
    redirect("/login");
  }

  return (
    <main className="text-center h-screen flex justify-center items-center">
      {/* Rest of the component */}
      <div className="container mx-auto w-1/3">
        <div className="md:flex no-wrap md:-mx-2">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className=" bg-balada_gray_600 p-3 border-t-4 border-balada_green_675 h-full">
              <div className="image overflow-hidden flex justify-center">
                <Image src={profile} width={60} alt="Perfil" />
              </div>
              <h1 className=" text-balada_green_800 font-bold text-xl leading-8 my-1">
                Matheus
              </h1>
              <h3 className=" text-balada_violet_375 font-lg text-semibold leading-6">
                matheus.cruz_@hotmail.com
                <p className="text-sm text-balada_green_675 cursor-pointer">
                  alterar senha
                </p>
              </h3>
              <ul className=" bg-balada_gray_450 text-gray-300 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">
                    Status:
                  </span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Ativo
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">
                    Data de cadastro:
                  </span>
                  <span className="ml-auto text-sm">Nov 07, 2016</span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">
                    Gênero:
                  </span>
                  <span className="ml-auto text-sm">Masculino</span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">
                    Data de nascimento:
                  </span>
                  <span className="ml-auto text-sm">30/09/1995</span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">
                    CPF:
                  </span>
                  <span className="ml-auto text-sm">067.567.085-38</span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">
                    Celular:
                  </span>
                  <span className="ml-auto text-sm">(73) 98174-9834</span>
                </li>
                <li className="flex items-center py-3 flex-wrap">
                  <span className=" font-semibold text-balada_violet_375">
                    Endereço:
                  </span>
                  <span className="text-sm mt-2">
                    Rua São José, Nº 47 Apto. 302, bairro São Caetano,
                    Itabuna-Ba, CEP 45607-348
                  </span>
                </li>
              </ul>
            </div>
            {/* End of profile card */}
          </div>
          {/* Right Side */}
          <div className="bg-balada_gray_600 w-2/3 border-t-4 border-balada_green_675">
            <div className="mx-auto py-8 sm:px-6 sm:py-24">
              <div className="px-2 sm:px-0">
                <h1 className="text-2xl font-bold tracking-tight text-balada_green_675 sm:text-3xl">
                  Order history
                </h1>
                <p className="mt-2 text-sm text-gray-300">
                  Check the status of recent orders, manage returns, and
                  download invoices.
                </p>
              </div>

              <div className="mt-16">
                <h2 className="sr-only">Recent orders</h2>

                <div className="space-y-16 sm:space-y-24">
                  <div>
                    <h3 className="sr-only">
                      Order placed on{" "}
                      <time dateTime="2021-01-22">January 22, 2021</time>
                    </h3>

                    <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                      <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                        <div className="flex justify-between md:block">
                          <dt className="font-medium text-gray-900">
                            Order number
                          </dt>
                          <dd className="md:mt-1">WU88191111</dd>
                        </div>
                        <div className="flex justify-between pt-4 md:block md:pt-0">
                          <dt className="font-medium text-gray-900">
                            Date placed
                          </dt>
                          <dd className="md:mt-1">
                            <time dateTime="2021-01-22">January 22, 2021</time>
                          </dd>
                        </div>
                        <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                          <dt>Total amount</dt>
                          <dd className="md:mt-1">$302.00</dd>
                        </div>
                      </dl>
                      <div className="mt-6 space-y-4 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0">
                        <a
                          href="#"
                          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                        >
                          View Order
                          <span className="sr-only">WU88191111</span>
                        </a>
                        <a
                          href="#"
                          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto"
                        >
                          View Invoice
                          <span className="sr-only">for order WU88191111</span>
                        </a>
                      </div>
                    </div>

                    <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
                      <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
                        <div className="flex py-6 sm:py-10">
                          <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                            <div className="lg:flex-1">
                              <div className="sm:flex">
                                <div>
                                  <h4 className="font-medium text-balada_violet_375">
                                    Nomad Tumbler
                                  </h4>
                                  <p className="mt-2 hidden text-sm text-gray-300 sm:block">
                                    This durable double-walled insulated tumbler
                                    keeps your beverages at the perfect
                                    temperature all day long. Hot, cold, or even
                                    lukewarm if you&#039;re weird like that,
                                    this bottle is ready for your next
                                    adventure.
                                  </p>
                                </div>
                                <p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">
                                  $35.00
                                </p>
                              </div>
                              <div className="mt-2 flex text-sm font-medium sm:mt-4">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-500"
                                >
                                  View Product
                                </a>
                                <div className="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                                  <a
                                    href="#"
                                    className="text-indigo-600 hover:text-indigo-500"
                                  >
                                    Buy Again
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
                            <Image
                              src="https://tailwindui.com/img/ecommerce-images/order-history-page-06-product-01.jpg"
                              alt="Olive drab green insulated bottle with flared screw lid and flat top."
                              className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52"
                              width={100}
                              height={50}
                            />
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
      </div>
    </main>
  );
};

export default Profile;
