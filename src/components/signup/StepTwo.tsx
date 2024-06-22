import { mask } from "remask"

export default function StepTwo({ data, updateFielHandler, register, errors }: { data: any; updateFielHandler: any, register: any, errors: any }) {
    return (
        <div>
            <main className=" flex w-full mx-auto justify-center items-center h-full">
                <div className='w-full h-full flex flex-col justify-center'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col justify-start w-full'>
                            <h1 className='default_title_form'>Informações pessoais</h1>
                            <p className='default_subtitle_form'>
                                Por favor, insira seus dados cadastrais
                            </p>
                        </div>
                        <div className="grid grid-cols-7 gap-2 md:gap-6 group">
                            <div className="relative z-0 w-full mb-5 group col-span-3 md:col-span-2">
                                <input
                                    type="text"
                                    {...register('firstName')}
                                    value={data.firstName || ""}
                                    onChange={(e) => updateFielHandler("firstName", e.target.value)}
                                    name="firstName"
                                    id="firstName"
                                    className="input_default_one_line peer"
                                />

                                <label
                                    htmlFor="firstName"
                                    className="label_input_default_one_line">Nome</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-4 md:col-span-3">
                                <input
                                    type="text"
                                    {...register('lastName')}
                                    value={data.lastName || ""}
                                    onChange={(e) => updateFielHandler("lastName", e.target.value)}
                                    name="lastName"
                                    id="lastName"
                                    className="input_default_one_line peer"
                                />

                                <label
                                    htmlFor="lastName"
                                    className="label_input_default_one_line">Sobrenome</label>
                            </div>
                            <div className="relative mt-[1px] z-0 w-full md:mb-5 group col-span-3 md:col-span-2">
                                <select
                                    value={data.gender || ""}
                                    {...register('gender')}
                                    onChange={(e) => updateFielHandler("gender", e.target.value)}
                                    name="gender"
                                    id="gender"
                                    className="select_input_default_one_line peer"
                                >
                                    <option selected>Definir</option>
                                    <option value="MA">Masculino</option>
                                    <option value="FE">Feminino</option>
                                    <option value="NB">Não Binário</option>
                                </select>
                                <label
                                    htmlFor="gender"
                                    className="label_input_default_one_line">Gênero</label>

                            </div>
                            <div className="relative z-0 w-full mb-5 group md:col-span-2 col-span-4">
                                <input
                                    type="text"
                                    {...register('documentNumber')}
                                    value={mask(data.documentNumber, ['999.999.999-99']) || ""}
                                    onChange={(e) => updateFielHandler("documentNumber", e.target.value)}
                                    pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
                                    name="documentNumber"
                                    id="documentNumber"
                                    className="input_default_one_line peer"
                                />
                                <label
                                    htmlFor="documentNumber"
                                    className="label_input_default_one_line">CPF</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group col-span-3">
                                <input
                                    type="tel"
                                    {...register('phone')}
                                    value={mask(data.phone, ['(99) 99999-9999']) || ""}
                                    onChange={(e) => updateFielHandler("phone", e.target.value)}
                                    pattern="(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})"
                                    name="phone"
                                    id="phone"
                                    className="input_default_one_line peer"
                                />

                                <label
                                    htmlFor="phone"
                                    className="label_input_default_one_line">Celular (Whats)</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group md:col-span-2 col-span-4">
                                <input
                                    type="date"
                                    {...register('birthDate')}
                                    value={data.birthDate || ""}
                                    onChange={(e) => updateFielHandler("birthDate", e.target.value)}
                                    name="birthDate"
                                    id="birthDate"
                                    className="input_default_one_line peer"
                                />
                                <label
                                    htmlFor="birthDate"
                                    className="label_input_default_one_line">Data de nascimento</label>
                            </div>
                        </div>
                    </div>
                    <div className="div_container_form_errors">
                        {errors?.firstName && <span className='label_error_input_forms'>{errors.firstName.message}</span>}
                        {errors?.lastName && <span className='label_error_input_forms'>{errors.lastName.message}</span>}
                        {errors?.gender && <span className='label_error_input_forms'>{errors.gender.message}</span>}
                        {errors?.documentNumber && <span className='label_error_input_forms'>{errors.documentNumber.message}</span>}
                        {errors?.phone && <span className='label_error_input_forms'>{errors.phone.message}</span>}
                        {errors?.birthDate && <span className='label_error_input_forms'>{errors.birthDate.message}</span>}
                    </div>
                </div>
            </main>

        </div>
    )
}