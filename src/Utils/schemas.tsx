
import { z } from 'zod';

export const formSchemaCreateUser = z.object({
    // firstName: z.string().min(3, 'Nome precisa ter pelo menos 3 caracteres'),
    // lastName: z.string().min(5, 'Sobrenome precisa ter pelo menos 5 caracteres'),
    email: z.string().email('Insira um e-mail com formato válido!'),
    password: z.string().min(8, 'Senha precisa ter pelo menos 8 caracteres.'),
    retryPassword: z.string().min(8, 'Senha precisa ter pelo menos 8 caracteres.'),
    // phone: z.string(),
    // birthDate: z.string(),
    // documentNumber: z.string(),
    // gender: z.string(),
    // cep: z.string(),
    // street: z.string(),
    // number: z.string(),
    // state: z.string(),
    // city: z.string(),
    // neighborhood: z.string(),
    // complement: z.string()
})