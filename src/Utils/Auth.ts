import { cookies } from "next/headers";

export const isAuthenticated = () => {

    const token = cookies().get('balada-user-token');
    console.log("token: " + cookies().get('balada-user-token')?.value);


    if (!token) {
      return false
    }

    return true;
  };
  
