import { FetchQueryKey } from '@/enums/querykey-enum';
import {
  CreateTaskSchema,
  UpdateTaskSchema,
} from '@/features/tasks/schemas/tasks-schema';
import {
  getListTask,
  getListTaskHistory,
  getListTaskStatus,
  postCreateTask,
  putUpdateTask,
  ResponseGetListTask,
  ResponseGetListTaskHistory,
  ResponseGetListTaskStatus,
} from '@/features/tasks/services/tasks-service';
import { ReactQueryConfig, ReactQueryConfigMutation } from '@/types/global';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetListTask = (config?: {
  options?: ReactQueryConfig<ResponseGetListTask>;
}) => {
  return useQuery({
    queryKey: [FetchQueryKey.getListTask],
    queryFn: () => getListTask(),
    ...config?.options,
  });
};

export const useGetListTaskHistory = (config?: {
  taskId: string;
  options?: ReactQueryConfig<ResponseGetListTaskHistory>;
}) => {
  return useQuery({
    queryKey: [FetchQueryKey.getListTaskHistory],
    queryFn: () => getListTaskHistory(config?.taskId as string),
    ...config?.options,
  });
};

export const useGetListTaskStatus = (config?: {
  options?: ReactQueryConfig<ResponseGetListTaskStatus>;
}) => {
  return useQuery({
    queryKey: [FetchQueryKey.getListStatusTask],
    queryFn: () => getListTaskStatus(),
    ...config?.options,
  });
};

export const useCreateTask = (config?: {
  options?: ReactQueryConfigMutation<unknown, CreateTaskSchema>;
}) => {
  return useMutation({
    mutationFn: (data: CreateTaskSchema) => postCreateTask(data),
    ...config?.options,
  });
};

export const useUpdateTask = (config?: {
  options?: ReactQueryConfigMutation<
    unknown,
    { taskId: string; data: UpdateTaskSchema }
  >;
}) => {
  return useMutation({
    mutationFn: ({ taskId, data }) => putUpdateTask(taskId, data),
    ...config?.options,
  });
};
