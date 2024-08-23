"use client";

import { useCookies } from 'next-client-cookies';
import {jwtDecode} from 'jwt-decode';
import {JwtPayload} from '@/utils/AuthServer'

export const useAuth = () => {
  const cookies = useCookies();

  const isAuthenticated = async (): Promise<boolean> => {
    const token = cookies.get('balada-user-token');
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        // Token is expired
        cookies.remove('balada-user-token');
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
      cookies.remove('balada-user-token');
      console.log("Token inválido")
      console.log("Token user: "+decodedToken.user_id)
      return false;
    }

    const data = await response.json();
    if (data.users && data.users.length > 0) {
      // Token is valid
      return true;
    } else {
      // Token is invalid
      cookies.remove('balada-user-token');
      return false;
    }
    } catch (error) {
      console.error("Failed to decode token:", error);
      return false;
    }
  };

  return { isAuthenticated };
};