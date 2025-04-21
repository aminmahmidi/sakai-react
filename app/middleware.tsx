// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Redirect root path to sign-in
  if (url.pathname === '/') {
    url.pathname = '/Auth/SalespersonAuth/SignInPage';
    return NextResponse.redirect(url);
    
    // OR for URL masking:
    // return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

// Optional: Limit middleware to specific paths
export const config = {
  matcher: ['/']
};