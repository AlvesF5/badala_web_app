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
      <div className="container mx-auto">
        <div className="md:flex no-wrap md:-mx-2">
          {/* Left Side */}
          <div className="w-full md:w-3/12 md:mx-2">
            {/* Profile Card */}
            <div className=" bg-balada_gray_600 p-3 border-t-4 border-balada_green_675">
              <div className="image overflow-hidden flex justify-center">
                <Image src={profile} width={60} alt="Perfil"/>
              </div>
              <h1 className=" text-balada_green_800 font-bold text-xl leading-8 my-1">
                Matheus
              </h1>
              <h3 className=" text-balada_violet_375 font-lg text-semibold leading-6">
                matheus.cruz_@hotmail.com
                <p className="text-sm text-balada_green_675 cursor-pointer">alterar senha</p>
              </h3>
              <ul className=" bg-balada_gray_450 text-gray-300 py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">Status:</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                      Ativo
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">Data de cadastro:</span>
                  <span className="ml-auto text-sm">Nov 07, 2016</span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">Gênero:</span>
                  <span className="ml-auto text-sm">Masculino</span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">Data de nascimento:</span>
                  <span className="ml-auto text-sm">30/09/1995</span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">CPF:</span>
                  <span className="ml-auto text-sm">067.567.085-38</span>
                </li>
                <li className="flex items-center py-3">
                  <span className=" font-semibold text-balada_violet_375">Celular:</span>
                  <span className="ml-auto text-sm">(73) 98174-9834</span>
                </li>
                <li className="flex items-center py-3 flex-wrap">
                  <span className=" font-semibold text-balada_violet_375">Endereço:</span>
                  <span className="text-sm mt-2">Rua São José, Nº 47 Apto. 302, bairro São Caetano, Itabuna-Ba, CEP 45607-348</span>
                </li>
              </ul>
            </div>
            {/* End of profile card */}
        
         
          </div>
          {/* Right Side */}
          <div className="w-full md:w-9/12 mx-2 h-64">
            {/* Profile tab */}
            {/* About Section */}
            <div className="bg-balada_gray_600 p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">Jane</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">Doe</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">Female</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">+11 998001001</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Current Address
                    </div>
                    <div className="px-4 py-2">
                      Beech Creek, PA, Pennsylvania
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Permanant Address
                    </div>
                    <div className="px-4 py-2">
                      Arlington Heights, IL, Illinois
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a
                        className="text-blue-800"
                        href="mailto:jane@example.com"
                      >
                        jane@example.com
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">Feb 06, 1998</div>
                  </div>
                </div>
              </div>
              <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Show Full Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
