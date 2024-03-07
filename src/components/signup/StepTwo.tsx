export default function StepTwo({ data, updateFielHandler }: { data: any; updateFielHandler: any }) {
    return (
        <div>
            <main className=" flex w-full mx-auto justify-center items-center h-full">
                <div className='w-full h-full flex flex-col justify-center'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col justify-start w-full'>
                            <h1 className='text-primary-marine-blue text-2xl md:text-3xl font-black text-balada_violet_500'>Informações pessoais</h1>
                            <p className='text-neutro-cool-gray text-sm text-white'>
                                Por favor, insira seus dados cadastrais
                            </p>
                        </div>
                        <div className="grid md:grid-cols-6 md:gap-6 group">
                            <div className="relative z-0 w-full mb-5 group col-span-2">
                                <input
                                    type="text"
                                    value={data.firstName || ""}
                                    onChange={(e) => updateFielHandler("firstName", e.target.value)}
                                    name="firstName"
                                    id="firstName"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    // required 
                                    />
                                <label
                                    htmlFor="firstName"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-3">
                                <input
                                    type="text"
                                    value={data.lastName || ""}
                                    onChange={(e) => updateFielHandler("lastName", e.target.value)}
                                    name="lastName"
                                    id="lastName"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    // required 
                                    />
                                <label
                                    htmlFor="lastName"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Sobrenome</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-1">
                                <select
                                    value={data.gender || ""}
                                    onChange={(e) => updateFielHandler("gender", e.target.value)}
                                    name="gender"
                                    id="gender"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-balada_gray_800 peer"
                                    // required
                                >
                                    <option selected>Definir</option>
                                    <option value="MA">Masculino</option>
                                    <option value="FE">Feminino</option>
                                    <option value="NB">Não Binário</option>
                                </select>
                                <label
                                    htmlFor="gender"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gênero</label>
                             
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    value={data.documentNumber || ""}
                                    onChange={(e) => updateFielHandler("documentNumber", e.target.value)}
                                    pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
                                    name="documentNumber"
                                    id="documentNumber"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    // required 
                                    />
                                <label
                                    htmlFor="documentNumber"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CPF (Apenas Números)</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="tel"
                                    value={data.phone || ""}
                                    onChange={(e) => updateFielHandler("phone", e.target.value)}
                                    pattern="(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})"
                                    name="phone"
                                    id="phone"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    // required 
                                    />
                                <label
                                    htmlFor="phone"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Celular (Whatsapp)</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="date"
                                    value={data.birthDate || ""}
                                    onChange={(e) => updateFielHandler("birthDate", e.target.value)}
                                    name="birthDate"
                                    id="birthDate"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    // required 
                                    />
                                <label
                                    htmlFor="birthDate"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Data de nascimento</label>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}