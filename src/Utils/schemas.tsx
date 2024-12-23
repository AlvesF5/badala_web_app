import { z } from "zod";
import { unMask } from "remask"

const currentDate = new Date();
const minimumAge = new Date(
  currentDate.getFullYear() - 14,
  currentDate.getMonth(),
  currentDate.getDate()
);

export const schemaCreateUserLogin = z
  .object({
    email: z.string().email("Insira um e-mail com formato válido!"),
    password: z.string().min(8, "Senha precisa ter pelo menos 8 caracteres."),
    retryPassword: z
      .string()
      .min(8, "Senha precisa ter pelo menos 8 caracteres."),
  })
  .refine((fields) => fields.password === fields.retryPassword, {
    path: ["retryPassword"],
    message: "Repetição de senha diferente de senha!",
  });

export const schemaUserUpdatePassword = z.object({
  email: z.string().email("Insira um e-mail com formato válido!"),
  password: z.string().min(8, "Senha precisa ter pelo menos 8 caracteres."),
  newPassword: z
    .string()
    .min(8, "Nova senha precisa ter pelo menos 8 caracteres."),
});

export const schemaUserPersonalInfo = z.object({
  firstName: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  lastName: z.string().min(5, "Sobrenome precisa ter pelo menos 5 caracteres"),
  phone: z.string().min(11, "Número precisa ter pelo menos 11 caracteres"),
  birthDate: z
    .string()
    .transform((date) => new Date(date))
    .refine((date) => date <= minimumAge, {
      message: "Idade deve ser maior que 14",
    }),
  documentNumber: z.string().min(1, "CPF não pode ser vazio"),
  gender: z.enum(["MA", "FE", "NB"], {
    errorMap: () => {
      return { message: "Selecione uma opção válida para o gênero!" };
    },
  }),
});

export const schemaUserAddressUpdate = z.object({
  id: z.string().min(36, "ID do endereço é inválido!"),
  cep: z.string().min(8, "CEP não pode ser vazio!"),
  street: z.string().min(4, "Rua não pode ser vazio!"),
  number: z.string().min(1, "Número não pode ser vazio!"),
  state: z.string().min(2, "Estado não pode ser vazio!"),
  city: z.string().min(3, "Cidade não pode ser vazio!"),
  neighborhood: z.string().min(3, "Bairro não pode ser vazio!"),
  complement: z.string(),
});

export const schemaUserAddressCreate = z.object({
  cep: z.string().min(8, "CEP não pode ser vazio!"),
  street: z.string().min(4, "Rua não pode ser vazio!"),
  number: z.string().min(1, "Número não pode ser vazio!"),
  state: z.string().min(2, "Estado não pode ser vazio!"),
  city: z.string().min(3, "Cidade não pode ser vazio!"),
  neighborhood: z.string().min(3, "Bairro não pode ser vazio!"),
  complement: z.string(),
});

export const schemaUserUpdate = z.object({
  firstName: z.string().min(3, "Nome precisa ter pelo menos 3 caracteres"),
  lastName: z.string().min(5, "Sobrenome precisa ter pelo menos 5 caracteres"),
  phone: z.string().min(11, "Número precisa ter pelo menos 11 caracteres"),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  documentNumber: z.string().min(1, "CPF não pode ser vazio"),
  gender: z.enum(["MA", "FE", "NB"], {
    errorMap: () => {
      return { message: "Selecione uma opção válida para o gênero!" };
    },
  }),
  address: schemaUserAddressUpdate,
});

export const schemaUserTerms = z
  .object({
    agree: z.boolean(),
  })
  .refine((fields) => fields.agree === true, {
    path: ["agree"],
    message: "Para continuar é preciso aceitar os termos de uso!",
  });

export const schemaResetPassword = z.object({
  email: z.string().email("Insira um e-mail com formato válido!"),
});

export const loginUserSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
});

// Schema para os detalhes do evento
export const eventDetailschema = z.object({
  eventName: z.string().min(5, 'Nome do evento é obrigatório'),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de término é obrigatória'),
  spaceName: z.string().min(1, 'Nome do espaço é obrigatório'),
  category: z.enum(["SHOWS", "THEATER", "TALK", "STAND_UP", "KIDS"], {
    errorMap: () => {
      return { message: "Selecione uma opção válida para a categoria!" };
    },
  }),
  classification: z.enum(["CL", "C10", "C12", "C14", "C16", "C18"], {
    errorMap: () => {
      return { message: "Selecione uma opção válida para a classificação!" };
    },
  }),
  eventDescription: z.string().min(1, 'Descrição é obrigatória'),
});

// Schema para os setores do evento
export const eventSectorSchema = z.object({
  sectors: z.array(
    z.object({
      sectorName: z.string().min(1, 'Nome do setor é obrigatório!'),
      capacity: z.number().min(1, 'Capacidade é obrigatória'),
      sectorDescription: z.string().min(1, 'Descrição é obrigatória!'),
      salePrice: z.number().min(1, 'Preço é obrigatório!'),
      sectorType: z.enum(["TRACK", "CABIN", "TABLE", "LOUNGE", "OTHER"], {
        errorMap: () => {
          return { message: "Selecione uma opção válida para a tipo!" };
        },
      }),
    })
  ),
});

// Schema para o endereço do evento
export const eventAddressSchema = z.object({
  cep: z.string().min(1, 'CEP é obrigatório'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  state: z.string().min(1, 'Estado é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  complement: z.string().optional(),
});