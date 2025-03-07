import { LoginSchema } from '@/features/auth/schemas/auth-schema';
import { baseApi } from '@/lib/axios';
import { ResponseAPI, ResponseAPIDefault } from '@/types/global';

export type ResponsePostLogin = ResponseAPI<{
  accessToken: {
    token: string;
    expiredAt: number;
  };
  refreshToken: {
    token: string;
    expiredAt: number;
  };
}>;

export const postLogin = async (
  data: LoginSchema
): Promise<ResponsePostLogin> => {
  return await baseApi.post('/auth/login', data).then((res) => res.data);
};

export const postLogout = async (
  refreshToken: string
): Promise<ResponseAPIDefault> => {
  return await baseApi.post('/auth/logout', { refreshToken });
};

export type ResponsePostRefreshAccessToken = ResponseAPI<{
  accessToken: {
    token: string;
    expiredAt: number;
  };
}>;

export const postRefreshAccessToken = async (
  refreshToken: string
): Promise<ResponsePostRefreshAccessToken> => {
  return await baseApi
    .post(
      '/auth/refresh',
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          Authorization: undefined,
        },
      }
    )
    .then((res) => res.data);
};
