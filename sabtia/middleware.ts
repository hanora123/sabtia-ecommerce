import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // Assuming token is stored in cookies
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/vendor/dashboard'];

  if (protectedRoutes.includes(pathname) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/vendor/:path*'], // Apply middleware to all routes under /vendor
};
