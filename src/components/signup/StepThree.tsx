export default function StepThree() {
    return (
        <div>
            <main className=" flex w-4/12 mx-auto justify-center items-center h-screen">
                <div className='w-full h-full flex flex-col justify-between'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col'>
                            <h1 className='text-primary-marine-blue text-2xl font-bold'>Informações Pessoais</h1>
                            <p className='text-neutro-cool-gray text-sm'>
                                Por favor, insira seus dados pessoais
                            </p>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='name' className='text-primary-marine-blue font-medium text-sm'>
                                    Email
                                </label>
                                <input
                                    type='text'
                                    placeholder='Ex: contato@baladaeventos.com'
                                    id='name'
                                    name='name'

                                    className='text-sm text-neutro-cool-gray border border-neutro-light-gray rounded-lg px-3 py-2.5 outline-none focus:border-primary-purplish-blue'
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='email' className='text-primary-marine-blue font-medium text-sm'>
                                    Senha
                                </label>
                                <input
                                    type='password'
                                    id='email'
                                    name='email'

                                    className='text-sm text-neutro-cool-gray border border-neutro-light-gray rounded-lg px-3 py-2.5 outline-none focus:border-primary-purplish-blue'
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='phone' className='text-primary-marine-blue font-medium text-sm'>
                                    Repetir Senha
                                </label>
                                <input
                                    type='password'
                                    id='phone'
                                    name='phone'

                                    className='text-sm text-neutro-cool-gray border border-neutro-light-gray rounded-lg px-3 py-2.5 outline-none focus:border-primary-purplish-blue'
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:flex justify-end'>

                    </div>
                </div>
            </main>
        </div>
    )
}