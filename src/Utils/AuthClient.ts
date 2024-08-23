"use client";

import { useCookies } from 'next-client-cookies';
import {jwtDecode} from 'jwt-decode';

export interface JwtPayload {
  exp: number;
}

export const useAuth = () => {
  const cookies = useCookies();

  const isAuthenticated = (): boolean => {
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
      return true;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return false;
    }
  };

  return { isAuthenticated };
};