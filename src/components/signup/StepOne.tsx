import {GrFormNext, GrFormPrevious} from 'react-icons/gr'

export default function StepOne() {
    return (
        <div>
            <main className=" flex w-4/12 mx-auto justify-center items-center h-screen">
                <div className='w-full h-full flex flex-col justify-center'>
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col'>
                            <h1 className='text-primary-marine-blue text-3xl font-black text-balada_violet_500'>Informações de login</h1>
                            <p className='text-neutro-cool-gray text-sm text-white'>
                                Por favor, insira um e-mail e senha válidos
                            </p>
                        </div>
                        <form>
                            <div className='flex flex-col gap-4 text-white'>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor='name' className='text-primary-marine-blue font-medium text-sm'>
                                        Email
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Ex: contato@baladaeventos.com'
                                        id='name'
                                        name='name'

                                        className='text-md  text-gray-800 border border-neutro-light-gray rounded-lg px-3 py-2.5 outline-none focus:border-primary-purplish-blue'
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
                            <div className='actions flex gap-2 mt-3 text-white font-semibold text-md'>
                                <button type="button" className='py-3 px-3 bg-balada_violet_500 flex items-center rounded-md uppercase'><GrFormPrevious/><span>Voltar</span></button>
                                <button type="submit" className='py-1 px-2 bg-balada_green_800 flex items-center rounded-md uppercase'><span>Avançar</span><GrFormNext/></button>
                            </div>
                        </form>
                    </div>

                </div>
            </main>

        </div>
    )
}