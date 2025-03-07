'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const session = useSession();

  if (session.status === 'loading') {
    return null;
  }

  return session.data?.user ? redirect('/tasks') : redirect('/login');
}
