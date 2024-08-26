import { toast } from "sonner";
import { unMask } from "remask";
import { deleteCookie } from "cookies-next";
import { UserUpdate, UpdateUserPassword } from "@/components/utils/Types";

export const getUserById = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:8080/v1/user/${userId}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorJson = await response.json();
      const errorMessage = errorJson.errors
        ? errorJson.errors.join(", ")
        : "Erro desconhecido";
      toast.error(`Erro ao obter o usuário: ${errorMessage}`);
      return null;
    }
    const userData = await response.json();
    return userData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(`Erro ao obter o usuário: ${error.message}`);
    } else {
      console.log("Ocorreu um erro desconhecido");
    }
    return null;
  }
};

export const updateUser = async (userId: string, user: UserUpdate) => {
  try {
    const response = await fetch(
      `http://localhost:8080/v1/user/update/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone ? unMask(user.phone) : "",
          birthDate: user.birthDate,
          documentNumber: user.documentNumber
            ? unMask(user.documentNumber)
            : "",
          gender: user.gender,
          address: {
            id: user.address.id,
            cep: user.address.cep ? unMask(user.address.cep) : "",
            street: user.address.street,
            number: user.address.number,
            state: user.address.state,
            city: user.address.city,
            neighborhood: user.address.neighborhood,
            complement: user.address.complement,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorJson = await response.json();
      const errorMessage = errorJson.errors
        ? errorJson.errors.join(", ")
        : "Erro desconhecido";
      toast.error(`Erro ao atualizar o usuário: ${errorMessage}`);
      return false;
    }

    toast.success("Usuário atualizado com sucesso!");
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(`Erro ao atualizar o usuário: ${error.message}`);
    } else {
      console.log("Ocorreu um erro desconhecido");
    }
    return false;
  }
};

export const updateUserPassword = async (data: UpdateUserPassword) => {
  try {
    const response = await fetch(
      "http://localhost:8080/v1/user/update-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorJson = await response.json();
      const errorMessage = errorJson.errors.join(", ");
      toast.error(`Erro ao atualizar a senha: ${errorMessage}`);
      return;
    }
    deleteCookie("balada-user-token");
    toast.success("Senha atualizada com sucesso!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(`Erro ao atualizar a senha: ${error.message}`);
    } else {
      console.log("Ocorreu um erro desconhecido");
    }
  }
};

export const sendEmailVerification = async (idToken: string) => {
    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: idToken,
        }),
      });
  
      if (!response.ok) {
        const errorJson = await response.json();
        const errorMessage = errorJson.error.message;
        toast.error(`Erro ao enviar e-mail de verificação: ${errorMessage}`);
        return;
      }
  
      toast.success('E-mail de verificação enviado com sucesso!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Erro ao enviar e-mail de verificação: ${error.message}`);
      } else {
        console.log('Ocorreu um erro desconhecido');
      }
    }
  };
