const { default: NextAuth } = require("next-auth");

export const { signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      phoneNumber: { label: "Phone" },
      otp: { label: otp },
    }),
  ],
});
