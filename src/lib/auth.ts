import { globalMessage } from '@/constants/message';
import {
  postLogin,
  postRefreshAccessToken,
} from '@/features/auth/services/auth-service';
import { getProfile } from '@/features/users/services/users-service';
import { parseError } from '@/utils/parse-error';
import { AxiosError } from 'axios';
import memoize from 'memoizee';
import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';

import Credentials from 'next-auth/providers/credentials';

export const refreshAccessToken = async (token: JWT) => {
  try {
    const { data } = await postRefreshAccessToken(
      token.token.refreshToken.token
    );

    return {
      ...token,
      token: {
        ...token.token,
        accessToken: {
          token: data.accessToken.token,
          expiredAt: data.accessToken.expiredAt,
        },
      },
    };
  } catch (_error) {
    return {
      ...token,
      error: 'RefreshTokenError',
    };
  }
};

export const memoizedRefreshToken = memoize(refreshAccessToken, {
  promise: true,

  normalizer: function (args) {
    return JSON.stringify(args[0].token.refreshToken.token);
  },
  maxAge: 60 * 1000,
});

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { data } = await postLogin({
            email: credentials?.email as string,
            password: credentials?.password as string,
          });

          const { data: dataProfile } = await getProfile(
            data.accessToken.token
          );

          return {
            user: dataProfile.user,
            token: data,
            id: dataProfile.user.roleId,
          };
        } catch (error) {
          if (error instanceof AxiosError) {
            const errorData = error.response?.data;
            throw new Error(parseError(errorData));
          } else {
            throw new Error(globalMessage.somethingWentWrong);
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }

      if (
        Date.now() >
        new Date(token?.token?.accessToken?.expiredAt * 1000).getTime()
      ) {
        return token;
      }

      return memoizedRefreshToken(token);
    },
    async session({ session, token }) {
      session.user = {
        ...token,
      };
      return session;
    },
  },
};
