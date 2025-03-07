import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

export const baseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/api`,
});

baseApi.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session) {
    config.headers.Authorization = `Bearer ${session.user.token.accessToken.token}`;
  }
  return config;
});

let signOutWhen401 = false;
baseApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (!signOutWhen401) {
        signOutWhen401 = true;
        if (typeof window !== undefined) {
          setTimeout(async () => {
            await signOut({
              callbackUrl: `${window.location.origin}/login`,
            });
          }, 1000);
        }
        signOutWhen401 = false;
      }
    }

    return Promise.reject(error);
  }
);
