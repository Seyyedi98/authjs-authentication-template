"use server";

import { RegisterSchema } from "@/schemas";

export const register = async (values) => {
  // server side values validation
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  return { success: "login credentials verified" };
};
