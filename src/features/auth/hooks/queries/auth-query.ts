import { postLogout } from '@/features/auth/services/auth-service';
import { ReactQueryConfigMutation } from '@/types/global';
import { useMutation } from '@tanstack/react-query';

export const useLogout = (config?: {
  options?: ReactQueryConfigMutation<unknown, string>;
}) => {
  return useMutation({
    mutationFn: (data: string) => postLogout(data),
    ...config?.options,
  });
};
