import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Phase 3 placeholder protection.
// If user navigates to protected pages without a local session, redirect to login.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedPrefixes = ['/dashboard', '/scanner', '/reports', '/community', '/analytics'];

  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  // Cookie set by auth placeholders. If it exists, allow.
  const raw = req.cookies.get('scamshield_session')?.value;
  if (raw && raw.length > 0) return NextResponse.next();

  // Debug-friendly redirect
  return NextResponse.redirect(new URL('/auth/login', req.url));

}

export const config = {
  matcher: ['/dashboard/:path*', '/scanner/:path*', '/reports/:path*', '/community/:path*', '/analytics/:path*'],
};


