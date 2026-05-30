import { NextResponse } from 'next/server';
import { auth } from './lib/auth'; // আপনার BetterAuth ইনস্ট্যান্স পাথ
import { headers } from 'next/headers';


export async function middleware(request) {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  
  return NextResponse.next();
}


export const config = {
  matcher: [
    '/add-tutor',          
    '/my-tutors',           
    '/booked-sessions',    
    '/profile/:path*',     
  ],
};
