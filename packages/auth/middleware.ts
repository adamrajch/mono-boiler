import { getSession } from 'better-auth/api';
import { type NextRequest, NextResponse } from 'next/server';

const isProtectedRoute = (request: NextRequest) => {
  return request.url.startsWith('/dashboard');
};

export const authMiddleware = async (request: NextRequest) => {
  const session = await getSession();

  if (isProtectedRoute(request) && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/dashboard'],
};
