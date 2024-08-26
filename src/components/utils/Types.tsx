import { z } from "zod";

import {
  schemaUserUpdate,
  schemaUserAddressUpdate,
  schemaUserUpdatePassword,
} from "@/utils/schemas";

type Address = z.infer<typeof schemaUserAddressUpdate> & {
  id: string;
  cep: string;
  street: string;
  number: string;
  state: string;
  city: string;
  neighborhood: string;
  complement: string;
};

export type User = z.infer<typeof schemaUserUpdate> & {
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  documentNumber: string;
  gender: string;
  address: Address;
};

const GenderEnum = z.enum(["MA", "FE", "NB"], {
  errorMap: () => {
    return { message: "Selecione uma opção válida para o gênero!" };
  },
});

type Gender = z.infer<typeof GenderEnum>;

export type UserUpdate = z.infer<typeof schemaUserUpdate> & {
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  documentNumber: string;
  gender: Gender;
  address: Address;
};

export type UpdateUserPassword = z.infer<typeof schemaUserUpdatePassword> & {
  email: string;
  password: string;
  newPassword: string;
};

export type UserDetails = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  documentNumber: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  addressString: string;
  address: Address;
};
