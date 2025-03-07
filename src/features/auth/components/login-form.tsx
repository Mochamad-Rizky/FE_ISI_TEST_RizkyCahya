'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormWrapper,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { globalMessage } from '@/constants/message';
import { loginSchema, LoginSchema } from '@/features/auth/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      setIsLoading(true);
      const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success('Login successfully');
        router.replace('/tasks');
      }

      if (!res?.ok) {
        const error = res?.error;

        toast.error(error ? error : globalMessage.somethingWentWrong);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Login to your account</h2>
        </CardTitle>
        <CardDescription>
          <p>Enter your email and password to login.</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel isMandatory>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel isMandatory>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='Password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} variant='default'>
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </FormWrapper>
        </Form>
      </CardContent>
    </Card>
  );
}
