import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import prisma from "./lib/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: { signIn: "/auth/login", error: "/auth/error" },
  async linkAccount({ user }) {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = getUserById(user.id);

      // Prevent sign in without email verification
      if (account.provider !== "credentials") {
        if (!existingUser?.emailVerified) return false;
        return true;
      }

      // 2FA check

      return true;
    },

    async session({ token, session }) {
      // Get id in session,  so we can access it from middleware
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
