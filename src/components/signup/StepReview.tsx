import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useState } from "react";
import {formatedDate,formatedCPF,formatedNumber,selectGender}  from '@/utils/Functions';

export default function StepReview({ data, updateFielHandler }: { data: any; updateFielHandler: any }) {
    const [password, setPassword] = useState("");
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
                    <div className='flex flex-col gap-8 text-white'>
                        Por favor, revise seus dados antes de enviar!
                    </div>
                    <div className=" bg-balada_gray_800 overflow-hidden">
                        <div className=" py-4">
                            <h3 className="text-lg leading-6 font-medium text-balada_violet_500">
                                Email e senha
                            </h3>
                            <div className=" py-2 sm:gap-4 flex justify-between">
                                <dt className="text-sm font-medium text-white">
                                    {data.email}
                                </dt>
                                <dd className="mt-1 text-sm text-white sm:mt-0 flex justify-end right-0">
                                    <span className="flex gap-2" onClick={handleToggle}>
                                        <div className='flex gap-5'>
                                            <div>
                                                <input
                                                    type={type}
                                                    name="password"
                                                    value={data.password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    autoComplete="current-password"
                                                    className='text-white w-full bg-balada_gray_800 text-right'
                                                />
                                            </div>
                                            <div>
                                                <Icon className="absolute -ml-4" icon={icon} size={20} />
                                            </div>
                                        </div>

                                        <div>

                                        </div>
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
                                            {data.street} Nº {data.number}, {data.complement}, Bairro: {data.neighborhood}, Cidade: {data.city}-{data.state}, CEP:{data.cep}
                                        </dd>
                                    </div>
                                </div>
                            </dl>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}