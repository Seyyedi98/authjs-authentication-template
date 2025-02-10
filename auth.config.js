/* eslint-disable import/no-anonymous-default-export */
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, getUserByPhoneNumber } from "./data/user";
import { LoginSchema, OtpLoginSchema } from "./schemas";

export default {
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
    Credentials({
      id: "otpLogin",
      name: "otpLogin",
      async authorize(credentials) {
        const validatedFields = OtpLoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { phoneNumber, password } = validatedFields.data;

          const user = await getUserByPhoneNumber(phoneNumber);
          if (!user || !user.password) return null;

          return user;
        }
        return null;
      },
    }),
  ],
};
