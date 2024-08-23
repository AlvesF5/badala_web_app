import { cookies } from 'next/headers';
import {jwtDecode} from 'jwt-decode';

export interface JwtPayload {
  exp: number;
}

export const isAuthenticated = (): boolean => {
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
    return true;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return false;
  }
};