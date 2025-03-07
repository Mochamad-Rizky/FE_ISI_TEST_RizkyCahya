import { z } from 'zod';

export type CreateTaskSchema = z.infer<ReturnType<typeof createTaskSchema>>;
export const createTaskSchema = () => {
  return z.object({
    title: z.string().min(1, 'Title cannot be empty!'),
    description: z.string().min(1, 'Description cannot be empty!'),
    statusId: z.string().min(1, 'Status cannot be empty!'),
    assigneeIds: z.array(z.string()).min(1, 'Assignee cannot be empty!'),
  });
};

export type UpdateTaskSchema = z.infer<ReturnType<typeof updateTaskSchema>>;
export const updateTaskSchema = (role: string | undefined) => {
  return z.object({
    ...(role === 'lead' && {
      title: z.string().min(1, 'Title cannot be empty!'),
    }),
    ...(role === 'lead' && {
      assigneeIds: z.array(z.string()).min(1, 'Assignee cannot be empty!'),
    }),
    description: z.string().min(1, 'Description cannot be empty!'),
    statusId: z.string().min(1, 'Status cannot be empty!'),
  });
};
