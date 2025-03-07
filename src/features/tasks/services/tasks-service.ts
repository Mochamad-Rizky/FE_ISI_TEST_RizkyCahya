import {
  CreateTaskSchema,
  UpdateTaskSchema,
} from '@/features/tasks/schemas/tasks-schema';
import {
  Task,
  TaskHistory,
  TaskStatus,
} from '@/features/tasks/types/tasks-type';
import { baseApi } from '@/lib/axios';
import { ResponseAPI, ResponseAPIDefault } from '@/types/global';

export type ResponseGetListTask = ResponseAPI<{ tasks: Task[] }>;
export const getListTask = async (): Promise<ResponseGetListTask> => {
  return await baseApi.get('/tasks').then((res) => res.data);
};

export const postCreateTask = async (
  data: CreateTaskSchema
): Promise<ResponseAPIDefault> => {
  return await baseApi.post('/tasks', data).then((res) => res.data);
};

export const putUpdateTask = async (
  taskId: string,
  data: UpdateTaskSchema
): Promise<ResponseAPIDefault> => {
  return await baseApi.put(`/tasks/${taskId}`, data).then((res) => res.data);
};

export type ResponseGetListTaskHistory = ResponseAPI<{
  histories: TaskHistory[];
}>;
export const getListTaskHistory = async (
  taskId: string
): Promise<ResponseGetListTaskHistory> => {
  return await baseApi.get(`/tasks/history/${taskId}`).then((res) => res.data);
};

export type ResponseGetListTaskStatus = ResponseAPI<{ statuses: TaskStatus[] }>;
export const getListTaskStatus =
  async (): Promise<ResponseGetListTaskStatus> => {
    return await baseApi.get('/statuses').then((res) => res.data);
  };
