import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { canAccess, homeFor, roleFromToken } from '@/lib/rbac';

// Guarda de sessão por cookie (renomeado de middleware.ts —
// arquivo obsoleto na versão do Next 16 deprecado).
export function proxy(request: NextRequest) {
  const token = request.cookies.get('spd_token')?.value;
  const { pathname } = request.nextUrl;

  // Rotas que não exigem autenticação
  const publicPaths = ['/login', '/favicon.ico'];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Se não houver token e a rota for privada, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // RBAC server-side: o papel vive no claim do JWT (defesa em profundidade —
  // o backend repete a verificação com require_role em cada endpoint).
  const role = roleFromToken(token);
  if (!canAccess(pathname, role)) {
    return NextResponse.redirect(new URL(homeFor(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, icons, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|images|icons).*)',
  ],
};