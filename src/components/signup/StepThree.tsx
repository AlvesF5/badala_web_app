export default function StepThree({ data, updateFielHandler }: { data: any; updateFielHandler: any }) {
    return (
        <div>
            <main className=" flex w-full mx-auto justify-center items-center h-full">
                <div className='w-full h-full flex flex-col justify-center'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col justify-start w-full'>
                            <h1 className='text-primary-marine-blue text-2xl md:text-3xl font-black text-balada_violet_500'>Informações de endereço</h1>
                            <p className='text-neutro-cool-gray text-sm text-white'>
                                Por favor, insira suas informações de moradia
                            </p>
                        </div>
                        <div className="grid md:grid-cols-6 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group col-span-1">
                                <input
                                    type="text"
                                    value={data.cep || ""}
                                    onChange={(e) => updateFielHandler("cep", e.target.value)}
                                    name="cep"
                                    id="cep"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                // required 
                                />
                                <label
                                    htmlFor="cep"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CEP</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-4">
                                <input
                                    type="text"
                                    value={data.street || ""}
                                    onChange={(e) => updateFielHandler("street", e.target.value)}
                                    name="street"
                                    id="street"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                // required 
                                />
                                <label
                                    htmlFor="street"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rua</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-1">
                                <input
                                    type="text"
                                    value={data.number || ""}
                                    onChange={(e) => updateFielHandler("number", e.target.value)}
                                    name="number"
                                    id="number"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                // required 
                                />
                                <label
                                    htmlFor="number"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-6 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group col-span-1">
                                <select
                                    value={data.state || ""}
                                    onChange={(e) => updateFielHandler("state", e.target.value)}
                                    name="state"
                                    id="state"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-balada_gray_800 peer"
                                    // required
                                >
                                    <option selected value="AM">AM</option>
                                    <option value="BA">BA</option>
                                </select>
                                <label
                                    htmlFor="state"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-3">
                                <input
                                    type="text"
                                    value={data.city || ""}
                                    onChange={(e) => updateFielHandler("city", e.target.value)}
                                    name="city"
                                    id="city"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                // required 
                                />
                                <label
                                    htmlFor="city"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cidade</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-2">
                                <input
                                    type="text"
                                    value={data.neighborhood || ""}
                                    onChange={(e) => updateFielHandler("neighborhood", e.target.value)}
                                    name="neighborhood"
                                    id="neighborhood"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                // required 
                                />
                                <label
                                    htmlFor="neighborhood"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bairro</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-1 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group col-span-3">
                                <input
                                    type="text"
                                    value={data.complement || ""}
                                    onChange={(e) => updateFielHandler("complement", e.target.value)}
                                    name="complement"
                                    id="complement"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                // required 
                                />
                                <label
                                    htmlFor="complement"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Complemento</label>
                            </div>

                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}