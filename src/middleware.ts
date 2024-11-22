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
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get('token');
  const isLogged = !!cookie;

  if (isProtectedRoute && !isLogged) {
    return NextResponse.redirect(new URL(getLoginUrl(), req.nextUrl));
  }

  if (isPublicRoute && isLogged && !isProtectedRoute) {
    return NextResponse.redirect(new URL(getDashboardUrl(), req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
