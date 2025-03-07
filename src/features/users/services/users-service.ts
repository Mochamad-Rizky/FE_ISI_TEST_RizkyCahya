import { baseApi } from '@/lib/axios';
import { BaseUser, ResponseAPI } from '@/types/global';

export type ResponseGetProfile = ResponseAPI<{ user: BaseUser['user'] }>;
export const getProfile = async (
  accessToken?: string
): Promise<ResponseGetProfile> => {
  return await baseApi
    .get(
      '/users/profile',
      accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : {}
    )
    .then((res) => res.data);
};

export type ResponseGetListUser = ResponseAPI<{ users: BaseUser['user'][] }>;
export const getListUser = async (): Promise<ResponseGetListUser> => {
  return await baseApi.get('/users').then((res) => res.data);
};
