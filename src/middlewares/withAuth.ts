import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

const authPaths = [
  '/login',
  '/api/auth/callback/google',
  '/api/auth/signin/google'
];

const onlyAdmin = ['/teachers', '/teachers/formAddTeacher', '/teachers/formEditTeacher', '/students/formAddStudent', '/students/class10', '/students/class11', '/students/class12'];

export default function withAuth(middleware: NextMiddleware, requireAuth: string[] = []) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // Allow the paths required for authentication
    if (authPaths.includes(pathname)) {
      return middleware(req, next);
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token && requireAuth.includes(pathname)) {
      const url = new URL('/login', req.url);
      url.searchParams.set('callbackUrl', encodeURI(req.url));
      return NextResponse.redirect(url);
    }

    if (token && pathname === '/login') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if(token?.role !== 'admin' && onlyAdmin.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }

  

    return middleware(req, next);
  };
}
