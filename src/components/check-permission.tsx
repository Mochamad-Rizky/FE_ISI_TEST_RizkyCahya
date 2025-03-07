import { Permission, PermissionType } from '@/enums/permission.enum';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

type CheckAccessPermissionProps = {
  permissions: PermissionType[];
  redirectUrl?: string;
  isRedirect?: boolean;
  children: React.ReactNode;
};

// export namespace Permission {
//   export enum Lead {
//     CreateTask = 'CreateTask',
//     UpdateSpecificTask = 'UpdateSpecificTask',
//     ViewTaskHistory = 'ViewTaskHistory',
//   }

//   export enum Team {
//     ViewTaskHistory = 'ViewTaskHistory',
//   }
// }

export default function CheckAccessPermission({
  permissions,
  redirectUrl = '/login',
  isRedirect,
  children,
}: CheckAccessPermissionProps) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (!session || !session.user) {
    return null;
  }

  if (!permissions.length) {
    return <>{children}</>;
  }

  const role = session.user.user.roleName as keyof typeof Permission;
  const hasAccess = permissions.some((permission) => {
    return role in Permission && Permission[role].hasOwnProperty(permission);
  });

  if (!hasAccess) {
    if (isRedirect) {
      return redirect(redirectUrl);
    }
    return null;
  }

  return <>{children}</>;
}
