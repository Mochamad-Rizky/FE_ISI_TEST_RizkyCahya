import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type ResponseAPI<T> = {
  data: T;
  message: string;
  success: boolean;
};

export type ResponseAPIDefault = Omit<ResponseAPI<unknown>, 'data'>;

type ErrorResponse = {
  statutsCode: number;
  error: string;
  message: string;
};

type BaseUser = {
  user: {
    id: string;
    name: string;
    email: string;
    roleId: string;
    roleName: 'lead' | 'team';
    createAt: string;
    updatedAt: string;
  };
  token: {
    accessToken: {
      token: string;
      expiredAt: number;
    };
    refreshToken: {
      token: string;
      expiredAt: number;
    };
  };
};

export type ReactQueryConfig<T = unknown> = Omit<
  UseQueryOptions<T, AxiosError<ErrorResponse>>,
  'queryKey' | 'queryFn'
>;

export type ReactQueryConfigMutation<TData = unknown, TVariabel = void> = Omit<
  UseMutationOptions<TData, AxiosError<ErrorResponse>, TVariabel, unknown>,
  'mutationFn'
>;

export type Route = {
  path: string;
  permissions?: PermissionType[];
  children?: Route[];
};
