import ProfileView from '@/features/users/components/view/profile-view';
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className='p-5 md:p-10'>
      <ProfileView />
      <div className='mt-5'>{children}</div>
    </div>
  );
}
