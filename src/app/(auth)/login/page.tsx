import LoginForm from '@/features/auth/components/login-form';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <LoginForm />
    </div>
  );
}
