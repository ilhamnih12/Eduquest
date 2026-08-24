import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { getServerUserByEmail, saveServerUser } from '@/lib/db/vercel-kv';
import { User } from '@/types/user';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'siswa@smp.sch.id' },
        password: { label: 'Password', type: 'password' },
        isGuest: { label: 'isGuest', type: 'text' },
        guestUsername: { label: 'guestUsername', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Handle Guest Mode instant login
        if (credentials.isGuest === 'true') {
          const guestId = `guest-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
          const guestUser: User = {
            id: guestId,
            email: `tamu_${guestId}@eduquest.local`,
            username: credentials.guestUsername?.trim() || 'Petualang Cilik',
            provider: 'guest',
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };
          return {
            id: guestUser.id,
            email: guestUser.email,
            name: guestUser.username,
            provider: 'guest',
          };
        }

        const email = credentials.email?.toLowerCase().trim();
        const password = credentials.password;

        if (!email || !password) {
          throw new Error('Email dan password wajib diisi.');
        }

        const existingUser = await getServerUserByEmail(email);

        if (!existingUser) {
          throw new Error('Akun belum terdaftar. Silakan registrasi terlebih dahulu.');
        }

        if (!existingUser.passwordHash) {
          throw new Error('Akun ini terdaftar melalui penyedia lain (Google OAuth).');
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);

        if (!isPasswordValid) {
          throw new Error('Password yang dimasukkan tidak sesuai.');
        }

        // Update last login
        existingUser.lastLogin = new Date().toISOString();
        await saveServerUser(existingUser);

        return {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.username,
          image: existingUser.avatar,
          provider: existingUser.provider,
        };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = (user as unknown as { provider?: string }).provider || account?.provider || 'credentials';
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as unknown as { id: string }).id = (token.id as string) || (token.sub as string);
        (session.user as unknown as { provider: string }).provider = (token.provider as string) || 'credentials';
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'eduquest-fallback-secret-development-key-32-chars-ok',
};
