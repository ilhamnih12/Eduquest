import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Middleware Wajib Login (No Guest / Demo Account)
 * ------------------------------------------------
 * - Semua halaman diproteksi: pengunjung tanpa sesi login diarahkan ke /login
 *   (dengan callbackUrl agar kembali otomatis setelah masuk).
 * - Halaman publik hanya /login dan /register.
 * - Pengguna yang SUDAH login dan membuka /login atau /register dialihkan ke /battle.
 * - Rute /api dan aset statis tidak diproses di sini.
 */

const PUBLIC_PATHS = ['/login', '/register'];

// Harus sama dengan fallback di lib/auth.ts
const AUTH_SECRET =
  process.env.NEXTAUTH_SECRET || 'eduquest-fallback-secret-development-key-32-chars-ok';

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const token = await getToken({ req: request, secret: AUTH_SECRET });
  const isPublicPath = PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  // Belum login → paksa ke halaman login/daftar
  if (!token && !isPublicPath) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname + (search || ''));
    return NextResponse.redirect(loginUrl);
  }

  // Sudah login → jangan tampilkan lagi halaman login/daftar (arahkan ke halaman utama)
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Kecualikan: folder internal Next.js, API routes (termasuk NextAuth),
  // dan file statis umum
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)',
  ],
};
