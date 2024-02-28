export default function StepTwo() {
    return (
        <div>
            <main className=" flex w-full mx-auto justify-center items-center h-full">
                <div className='w-full h-full flex flex-col justify-center'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-4 text-white'>
                            <div className='flex flex-col justify-start w-full'>
                                <h1 className='text-primary-marine-blue text-2xl md:text-3xl font-black text-balada_violet_500'>Informações pessoais</h1>
                                <p className='text-neutro-cool-gray text-sm text-white'>
                                    Por favor, insira um e-mail e senha válidos
                                </p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='name' className='text-primary-marine-blue font-medium text-sm'>
                                    Email
                                </label>
                                <input
                                    type='text'
                                    placeholder='Ex: contato@baladaeventos.com'
                                    id='email'
                                    name='email'

                                    className='text-md  text-gray-800 border border-neutro-light-gray rounded-lg px-3 py-2.5 outline-none focus:border-primary-purplish-blue'
                                    // required
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='email' className='text-primary-marine-blue font-medium text-sm'>
                                    Senha
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'

                                    className='text-sm text-gray-800 border border-neutro-light-gray rounded-lg px-3 py-2.5 outline-none focus:border-primary-purplish-blue'
                                    // required
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='phone' className='text-primary-marine-blue font-medium text-sm'>
                                    Repetir Senha
                                </label>
                                <input
                                    type='password'
                                    id='retry-password'
                                    name='retry-password'

                                    className='text-sm text-gray-800 border border-neutro-light-gray rounded-lg px-3 py-2.5 outline-none focus:border-primary-purplish-blue'
                                    // required
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </main>

        </div>
    )
}