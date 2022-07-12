// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const response = NextResponse.next();
  const { cookies } = req;
  const token = cookies.get('token');

  if(!token) {
    if(req.nextUrl.pathname === '/login') {
      return NextResponse.next();
    }
  // return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_BASE_USER_URL, req.url))
  }

  if (req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return response;
}
