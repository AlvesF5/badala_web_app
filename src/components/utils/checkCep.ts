import { toast } from 'sonner';

export const checkCEP = async (e: any, setValue: any, getValues: any) => {
    const cep: string = e.target.value.replace(/\D/g, '');

    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const address = await response.json();

            if (address.erro) {
                toast.error('Por favor, verifique se o CEP digitado está correto e digite novamente!');
            } else {
                // Atualiza os valores dos campos usando setValue do react-hook-form
                setValue('cep', address.cep, { shouldValidate: true });
                setValue('street', address.logradouro, { shouldValidate: true });
                setValue('state', address.uf, { shouldValidate: true });
                setValue('city', address.localidade, { shouldValidate: true });
                setValue('neighborhood', address.bairro, { shouldValidate: true });
                setValue('complement', address.complemento, { shouldValidate: true });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Erro ao buscar endereço com o CEP digitado: ${error.message}`);
            } else {
                console.log('Ocorreu um erro desconhecido');
            }
        }
    }
};