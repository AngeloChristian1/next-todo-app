import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from './lib/schema';

export const { handlers, auth } = NextAuth({
  providers: [Github],
  adapter: DrizzleAdapter(db),
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
} satisfies NextAuthConfig);
