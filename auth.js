import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import prisma from "./lib/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { revalidatePath } from "next/cache";

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
      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (account.provider !== "credentials") {
        if (!existingUser?.emailVerified) return false;
        return true;
      }

      // Check if 2FA is enabled.
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        console.log(twoFactorConfirmation);

        if (!twoFactorConfirmation) return false;

        // Delete 2FA confirmation for next sign in
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

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
