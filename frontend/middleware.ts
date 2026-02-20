import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow login page
  if (path === '/admin/login') {
    return NextResponse.next();
  }
  
  // Check auth for other admin pages
  if (path.startsWith('/admin')) {
    const sessionToken = request.cookies.get('session-token');
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
