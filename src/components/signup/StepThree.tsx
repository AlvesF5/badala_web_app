import { mask, unMask } from "remask"
import { toast } from 'sonner';

export default function StepThree({ data, updateFielHandler, register, errors, setValue, getValues }: { data: any; updateFielHandler: any, register: any, errors: any, setValue: any, getValues: any }) {

    const checkCEP = async (e: any) => {
        const cep: string = e.target.value.replace(/\D/g, '');

        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // Informa o tipo de conteúdo que está sendo enviado
                    },
                    body: null
                });

              
                const address = await response.json();
                
                if (address.erro===true) {
                    toast.error(`Por favor, verifique se o CEP digitado está correto e digite novamente!`);
                }


                if(address.cep===mask(cep, ['99999-999'])){
                    setValue('cep', address.cep, { shouldValidate: true });
                    setValue('street', address.logradouro, { shouldValidate: true });
                    setValue('state', address.uf, { shouldValidate: true });
                    setValue('city', address.localidade, { shouldValidate: true });
                    setValue('neighborhood', address.bairro, { shouldValidate: true });
                    setValue('complement', address.complemento, { shouldValidate: true });
    
                    updateFielHandler("street", getValues("street"))
                    updateFielHandler("state", getValues("state"))
                    updateFielHandler("city", getValues("city"))
                    updateFielHandler("neighborhood", getValues("neighborhood"))
                    updateFielHandler("complement", getValues("complement"))
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast.error(`Erro ao buscar endereço com cep digitado: ${error.message}`);
                } else {
                    console.log('Ocorreu um erro desconhecido');
                }
            }

        }

    }

    return (
        <div>
            <main className=" flex w-full mx-auto justify-center items-center h-full">
                <div className='w-full h-full flex flex-col justify-center'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col justify-start w-full'>
                            <h1 className='default_title_form'>Informações de endereço</h1>
                            <p className='default_subtitle_form'>
                                Por favor, digite o CEP para o endereço ser preenchido automaticamente.
                            </p>
                        </div>
                        <div className="grid grid-cols-6 md:gap-6 gap-2">
                            <div className="relative z-0 w-full mb-5 group md:col-span-1 col-span-2">
                                <input
                                    type="text"
                                    {...register("cep")}
                                    value={mask(data?.cep, ['99999-999']) || ""}
                                    onChange={(e) => { checkCEP(e); updateFielHandler("cep", e.target.value) }}
                                    name="cep"
                                    id="cep"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="cep"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CEP</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-4">
                                <input
                                    type="text"
                                    {...register("street")}
                                    value={data.street || ""}
                                    onChange={(e) => updateFielHandler("street", e.target.value)}
                                    name="street"
                                    id="street"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="street"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Rua/Logradouro</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-1">
                                <input
                                    type="text"
                                    {...register("number")}
                                    value={data.number || ""}
                                    onChange={(e) => updateFielHandler("number", e.target.value)}
                                    name="number"
                                    id="number"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="number"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Número</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-1">
                                <select
                                    value={data.state || ""}
                                    {...register("state")}
                                    onChange={(e) => updateFielHandler("state", e.target.value)}
                                    name="state"
                                    id="state"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:bg-balada_gray_800 peer"
                                >
                                    <option selected value="AC">Acre</option>
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                    <option value="EX">Estrangeiro</option>
                                </select>
                                <label
                                    htmlFor="state"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Estado</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group md:col-span-3 col-span-4">
                                <input
                                    type="text"
                                    {...register("city")}
                                    value={data.city || ""}
                                    onChange={(e) => updateFielHandler("city", e.target.value)}
                                    name="city"
                                    id="city"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="city"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cidade</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group md:col-span-2 col-span-6">
                                <input
                                    type="text"
                                    {...register("neighborhood")}
                                    value={data.neighborhood || ""}
                                    onChange={(e) => updateFielHandler("neighborhood", e.target.value)}
                                    name="neighborhood"
                                    id="neighborhood"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="neighborhood"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Bairro</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-6">
                                <input
                                    type="text"
                                    {...register("complement")}
                                    value={data.complement || ""}
                                    onChange={(e) => updateFielHandler("complement", e.target.value)}
                                    name="complement"
                                    id="complement"
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label
                                    htmlFor="complement"
                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Complemento</label>
                            </div>


                        </div>
                    </div>

                    <div className="div_container_form_errors">
                        {errors?.cep && <span className='label_error_input_forms'>{errors.cep.message}</span>}
                        {errors?.street && <span className='label_error_input_forms'>{errors.street.message}</span>}
                        {errors?.number && <span className='label_error_input_forms'>{errors.number.message}</span>}
                        {errors?.state && <span className='label_error_input_forms'>{errors.state.message}</span>}
                        {errors?.city && <span className='label_error_input_forms'>{errors.city.message}</span>}
                        {errors?.neighborhood && <span className='label_error_input_forms'>{errors.neighborhood.message}</span>}
                        {errors?.complement && <span className='label_error_input_forms'>{errors.complement.message}</span>}
                    </div>

                </div>
            </main>

        </div>
    )
}