"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiEdit, FiTrash } from "react-icons/fi";
import Image from "next/image";

const Dashboard = () => {
  return (
    <div className="antialiased bg-black w-full min-h-screen text-slate-300 relative py-4">
      <div className="grid grid-cols-12 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-14 max-w-7xl my-10 px-2">
        <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4">
          <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-white via-white/50 to-transparent bg-clip-text text-transparent">
            Dashboard<span className="text-indigo-400">.</span>
          </h1>
          <p className="text-slate-400 text-sm mb-2">Welcome back,</p>
          <a
            href="#"
            className="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2"
          >
            <div>
              <Image
                className="rounded-full w-10 h-10 relative object-cover"
                src="https://via.placeholder.com/150"
                alt="User Avatar"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="font-medium group-hover:text-indigo-400 leading-4">
                Jim Smith
              </p>
              <span className="text-xs text-slate-400">Pantazi LLC</span>
            </div>
          </a>
          <hr className="my-2 border-slate-700" />
          <div id="menu" className="flex flex-col space-y-2 my-5">
            <a
              href="#"
              className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
            >
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:text-indigo-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg text-slate-200 leading-4 group-hover:text-indigo-400">
                    Dashboard
                  </p>
                  <p className="text-slate-400 text-sm hidden md:block">
                    Data overview
                  </p>
                </div>
              </div>
            </a>
            {/* Add other menu items here */}
          </div>
          <p className="text-sm text-center text-gray-600">
            v2.0.0.3 | &copy; 2022 Pantazi Soft
          </p>
        </div>
        <div id="content" className="bg-white/10 col-span-9 rounded-lg p-6">
          <div id="24h">
            <h1 className="font-bold py-4 uppercase">Last 24h Statistics</h1>
            <div
              id="stats"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div className="bg-black/60 to-white/5 p-6 rounded-lg">
                <div className="flex flex-row space-x-4 items-center">
                  <div id="stats-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-10 h-10 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-indigo-300 text-sm font-medium uppercase leading-4">
                      Users
                    </p>
                    <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                      <span>+28</span>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                          />
                        </svg>
                      </span>
                    </p>
                  </div>

                  <div id="stats-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-10 h-10 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-teal-300 text-sm font-medium uppercase leading-4">Income</p>
                    <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                      <span>$2,873.88</span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>

                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-teal-300 text-sm font-medium uppercase leading-4">Saldo</p>
                    <p className="text-white font-bold text-2xl inline-flex items-center space-x-2">
                      <span>$2,873.88</span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>

                      </span>
                    </p>
                  </div>

                </div>
              </div>
              <div id="last-users w-full">
                <h1 className="font-bold py-4 uppercase">Last 24h users</h1>
                <div className="w-full">
                  <table className="w-full">
                    <thead className="bg-black/60">
                      <th className="text-left py-3 px-2 rounded-l-lg">Name</th>
                      <th className="text-left py-3 px-2">Email</th>
                      <th className="text-left py-3 px-2">Group</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2 rounded-r-lg">Actions</th>
                    </thead>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-2 font-bold">
                        <div className="inline-flex space-x-3 items-center">
                          <span>    <Image
                            className="rounded-full w-10 h-10 relative object-cover"
                            src="https://via.placeholder.com/150"
                            alt="User Avatar"
                            width={40}
                            height={40}
                          /></span>
                          <span>Thai Mei</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">thai.mei@abc.com</td>
                      <td className="py-3 px-2">User</td>
                      <td className="py-3 px-2">Approved</td>
                      <td className="py-3 px-2">
                        <div className="inline-flex items-center space-x-3">
                          <a href="" title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          </a>
                          <a href="" title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          </a>
                          <a href="" title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-2 font-bold">
                        <div className="inline-flex space-x-3 items-center">
                          <span>    <Image
                            className="rounded-full w-10 h-10 relative object-cover"
                            src="https://via.placeholder.com/150"
                            alt="User Avatar"
                            width={40}
                            height={40}
                          /></span>
                          <span>Thai Mei</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">thai.mei@abc.com</td>
                      <td className="py-3 px-2">User</td>
                      <td className="py-3 px-2">Approved</td>
                      <td className="py-3 px-2">
                        <div className="inline-flex items-center space-x-3">
                          <a href="" title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          </a>
                          <a href="" title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          </a>
                          <a href="" title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-2 font-bold">
                        <div className="inline-flex space-x-3 items-center">
                          <span>    <Image
                            className="rounded-full w-10 h-10 relative object-cover"
                            src="https://via.placeholder.com/150"
                            alt="User Avatar"
                            width={40}
                            height={40}
                          /></span>
                          <span>Thai Mei</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">thai.mei@abc.com</td>
                      <td className="py-3 px-2">User</td>
                      <td className="py-3 px-2">Approved</td>
                      <td className="py-3 px-2">
                        <div className="inline-flex items-center space-x-3">
                          <a href="" title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          </a>
                          <a href="" title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          </a>
                          <a href="" title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-2 font-bold">
                        <div className="inline-flex space-x-3 items-center">
                          <span>    <Image
                            className="rounded-full w-10 h-10 relative object-cover"
                            src="https://via.placeholder.com/150"
                            alt="User Avatar"
                            width={40}
                            height={40}
                          /></span>
                          <span>Marquez Spineli</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">marquez.spineli@cba.com</td>
                      <td className="py-3 px-2">User</td>
                      <td className="py-3 px-2">Approved</td>
                      <td className="py-3 px-2">
                        <div className="inline-flex items-center space-x-3">
                          <a href="" title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          </a>
                          <a href="" title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          </a>
                          <a href="" title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-2 font-bold">
                        <div className="inline-flex space-x-3 items-center">
                          <span>    <Image
                            className="rounded-full w-10 h-10 relative object-cover"
                            src="https://via.placeholder.com/150"
                            alt="User Avatar"
                            width={40}
                            height={40}
                          /></span>
                          <span>Mark Spike</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">mark.spike@abc.com</td>
                      <td className="py-3 px-2">Administrator</td>
                      <td className="py-3 px-2">Approved</td>
                      <td className="py-3 px-2">
                        <div className="inline-flex items-center space-x-3">
                          <a href="" title="Edit" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                          </svg>
                          </a>
                          <a href="" title="Edit password" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                          </svg>
                          </a>
                          <a href="" title="Suspend user" className="hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                          </a>
                        </div>
                      </td>
                    </tr>


                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;