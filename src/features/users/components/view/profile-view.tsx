'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { globalMessage } from '@/constants/message';
import { useLogout } from '@/features/auth/hooks/queries/auth-query';
import { useGetProfile } from '@/features/users/hooks/users-query';
import { parseError } from '@/utils/parse-error';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function ProfileView() {
  const session = useSession();
  const { isFetching, data, isError, error } = useGetProfile();
  const { mutate, isPending } = useLogout();

  return (
    <Card>
      <CardHeader className='flex flex-row justify-between'>
        <CardTitle>
          <h2>Selamat Datang</h2>
        </CardTitle>
        <Button
          disabled={isPending}
          variant='destructive'
          onClick={() =>
            mutate(session?.data?.user.token.refreshToken.token as string, {
              onSuccess: async () => {
                await signOut({
                  callbackUrl: `${window.location.origin}/login`,
                });
              },
              onError: (error) => {
                toast.error(parseError(error.response?.data));
              },
            })
          }
        >
          {isPending ? 'Loading...' : 'Logout'}
        </Button>
      </CardHeader>
      <CardContent>
        {isFetching && (
          <div>
            <Skeleton className='h-[200px]' />
          </div>
        )}

        {isError && !isFetching && (
          <Alert variant='destructive'>
            <AlertTitle>
              {parseError(error?.response?.data) ||
                globalMessage.somethingWentWrong}
            </AlertTitle>
          </Alert>
        )}

        {!isError && !isFetching && data && (
          <div className='space-y-4'>
            <div className='flex items-center space-x-4'>
              <div className='bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full border'>
                <span className='text-primary text-2xl font-bold'>
                  {data.data.user.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className='text-xl font-semibold'>{data.data.user.name}</h3>
                <Badge
                  variant={
                    data.data.user.roleName === 'lead' ? 'default' : 'warning'
                  }
                >
                  {data.data.user.roleName}
                </Badge>
              </div>
            </div>

            <div className='grid gap-4 border-t pt-4'>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Email
                </p>
                <p>{data.data.user.email}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
