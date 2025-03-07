import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { PermissionRole } from './enums/permission.enum';
import { protectedRoutes } from './routes/protected-routes';
import { redirectWhenLoggedInRoutes } from './routes/redirect-when-logged-in-routes';
import { Route } from './types/global';

const createRouteRegex = (path: string): RegExp =>
  new RegExp(`^${path.replace(/\[.*?\]/g, '[^/]+').replace(/\//g, '\\/')}$`);

function checkAccess(
  routes: Route[],
  pathname: string,
  userRole: PermissionRole
): boolean | null {
  for (const route of routes) {
    const routeRegex = createRouteRegex(route.path);

    if (routeRegex.test(pathname)) {
      const hasRequiredPermission =
        !route.permissions || route.permissions.includes(userRole);

      return hasRequiredPermission;
    }

    if (route.children) {
      const childAccess = checkAccess(route.children, pathname, userRole);
      if (childAccess !== null) {
        return childAccess;
      }
    }
  }

  return null; // Public route
}

const isRouteProtected = (routes: Route[], pathname: string): boolean => {
  return routes.some((route) => {
    const routeRegex = createRouteRegex(route.path);
    if (routeRegex.test(pathname)) return true;
    if (route.children) return isRouteProtected(route.children, pathname);
    return false;
  });
};

export default async function middleware(
  req: NextRequest
): Promise<NextResponse | undefined> {
  try {
    const pathname = req.nextUrl.pathname;
    const token = await getToken({ req });

    if (token) {
      const user = token.user;
      const userRole = user?.roleName as PermissionRole;

      const isRedirectWhenLoggedIn = redirectWhenLoggedInRoutes.some((route) =>
        createRouteRegex(route.path).test(pathname)
      );

      if (isRedirectWhenLoggedIn) {
        return NextResponse.redirect(new URL('/tasks', req.url));
      }

      const hasAccess = checkAccess(protectedRoutes, pathname, userRole);

      if (hasAccess === false) {
        const url = req.nextUrl.clone();
        url.pathname = '/not-found';
        return NextResponse.rewrite(url);
      }
    } else {
      const isProtectedRoute = isRouteProtected(protectedRoutes, pathname);

      if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/error', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
