
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useState } from "react";

export default function StepOne({ data, updateFielHandler }: { data: any; updateFielHandler: any }) {
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eye);

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eyeOff);
            setType('text')
        } else {
            setIcon(eye)
            setType('password')
        }
    }

    return (
        <div>
            <main className=" flex w-full mx-auto justify-center items-center h-full">
                <div className='w-full h-full flex flex-col justify-center'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-4 text-white'>
                            <div className='flex flex-col justify-start w-full'>
                                <h1 className='text-primary-marine-blue text-2xl md:text-3xl font-black text-balada_violet_500'>Informações de login</h1>
                                <p className='text-neutro-cool-gray text-sm text-white'>
                                    Por favor, insira um e-mail e senha válidos
                                </p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="email"
                                        value={data.email || ""}
                                        onChange={(e) => updateFielHandler("email", e.target.value)}
                                        name="email"
                                        id="email"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    // required
                                    />
                                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div>
                                    <div className="mb-4 relative z-0 w-full group flex">
                                        <input
                                            type={type}
                                            name="password"
                                            id="password"
                                            value={data.password || ""}
                                            onChange={(e) => updateFielHandler("password", e.target.value)}
                                            autoComplete="current-password"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        />
                                        <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Senha</label>
                                        <span className="flex justify-around items-center" onClick={handleToggle}>
                                            <Icon className="absolute mr-10" icon={icon} size={20} />
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-4 relative z-0 w-full group flex">
                                    <input
                                        type={type}
                                        name="retryPassword"
                                        id="retryPassword"
                                        value={data.retryPassword || ""}
                                        onChange={(e) => updateFielHandler("retryPassword", e.target.value)}
                                        autoComplete="current-password"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                    <label htmlFor="retryPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repetir Senha</label>
                                    <span className="flex justify-around items-center" onClick={handleToggle}>
                                        <Icon className="absolute mr-10" icon={icon} size={20} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}