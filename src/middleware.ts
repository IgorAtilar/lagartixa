import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  getCoinUrl,
  getDashboardUrl,
  getLoginUrl,
  getSearchUrl,
  getSignupUrl,
} from './helpers/urls';

// 1. Specify protected and public routes
const protectedRoutes = [getDashboardUrl(), getSearchUrl(), getCoinUrl('')];
const publicRoutes = [getSignupUrl(), getLoginUrl(), '/'];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('token');
  const isLogged = cookie ? true : false;

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isLogged) {
    return NextResponse.redirect(new URL(getLoginUrl(), req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    isLogged &&
    !protectedRoutes.includes(req.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL(getDashboardUrl(), req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
