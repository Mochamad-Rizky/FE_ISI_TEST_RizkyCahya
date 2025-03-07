import { BaseUser } from '@/types/global';
import 'next-auth';

import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: BaseUser;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends BaseUser {}
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends BaseUser {}
}
