import { FetchQueryKey } from '@/enums/querykey-enum';
import {
  getListUser,
  getProfile,
  ResponseGetListUser,
  ResponseGetProfile,
} from '@/features/users/services/users-service';
import { ReactQueryConfig } from '@/types/global';
import { useQuery } from '@tanstack/react-query';

export const useGetProfile = (config?: {
  options?: ReactQueryConfig<ResponseGetProfile>;
}) => {
  return useQuery({
    queryKey: [FetchQueryKey.getProfile],
    queryFn: () => getProfile(),
    ...config?.options,
  });
};

export const useGetListUsers = (config?: {
  options?: ReactQueryConfig<ResponseGetListUser>;
}) => {
  return useQuery({
    queryKey: [FetchQueryKey.getListUsers],
    queryFn: () => getListUser(),
    ...config?.options,
  });
};
