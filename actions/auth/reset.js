"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";

export const reset = async (values) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "آدرس ایمیل نامعتبر" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "کاربری با این ایمیل یافت نشد" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
