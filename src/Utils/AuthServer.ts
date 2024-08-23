import { cookies } from 'next/headers';
import {jwtDecode} from 'jwt-decode';

export interface JwtPayload {
    exp: number;
    name: string;
    custom_claims: string[];
    user_id: string;
    email: string;
    email_verified: boolean;
}

export const isAuthenticated = async (): Promise<boolean> => {
  const tokenCookie = cookies().get('balada-user-token');
  if (!tokenCookie) {
    return false;
  }
  const token = tokenCookie.value; // Acessa a propriedade 'value' do objeto RequestCookie
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      // Token is expired
      cookies().delete('balada-user-token');
      return false;
    }

    // Verifica a validade do token com a API do Firebase
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: token,
      }),
    });

    if (!response.ok) {
      // Token is invalid
      cookies().delete('balada-user-token');
      console.log("Token inválido!")
      console.log("Token user: "+decodedToken.user_id)
      return false;
    }

    const data = await response.json();
    if (data.users && data.users.length > 0) {
      // Token is valid
      return true;
    } else {
      // Token is invalid
      cookies().delete('balada-user-token');
      return false;
    }
  } catch (error) {
    console.error("Failed to decode token or verify with Firebase:", error);
    return false;
  }
};