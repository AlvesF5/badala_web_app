
import { z } from 'zod';

export const schemaUserLogin = z.object({
    email: z.string().email('Insira um e-mail com formato válido!'),
    password: z.string().min(8, 'Senha precisa ter pelo menos 8 caracteres.'),
    retryPassword: z.string().min(8, 'Senha precisa ter pelo menos 8 caracteres.'),
}).refine((fields) => fields.password === fields.retryPassword, {
    path: ['retryPassword'],
    message: 'Repetição de senha diferente de senha!'});


export const schemaUserPersonalInfo = z.object({
    firstName: z.string().min(3, 'Nome precisa ter pelo menos 3 caracteres'),
    lastName: z.string().min(5, 'Sobrenome precisa ter pelo menos 5 caracteres'),
    phone: z.string().min(11, "Número precisa ter pelo menos 11 caracteres"),
    birthDate: z.string().min(1, "Data de nascimento não pode ser vazio"),
    documentNumber: z.string().min(1, "CPF não pode ser vazio"),
    gender: z.string().min(1, "Gênero não pode ser vazio"),
});

export const schemaUserAddress = z.object({
    cep: z.string().min(8, "CEP não pode ser vazio"),
    street: z.string().min(4, "Rua não pode ser vazio"),
    number: z.string().min(1, "Número não pode ser vazio"),
    state: z.string().min(2, "Estado não pode ser vazio"),
    city: z.string().min(3, "Cidade não pode ser vazio"),
    neighborhood: z.string().min(3, "Bairro não pode ser vazio"),
    complement: z.string()
});

export const schemaUserTerms = z.object({
    agree: z.boolean(),
}).refine((fields) => fields.agree === true, {
    path: ['agree'],
    message: 'Para continuar é preciso aceitar os termos de uso!'});

