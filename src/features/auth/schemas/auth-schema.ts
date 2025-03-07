import { z } from 'zod';

export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;
export const loginSchema = () => {
  return z.object({
    email: z.string().min(1, 'Username/Email cannot be empty!'),
    password: z.string().min(1, 'Password cannot be empty!'),
  });
};
