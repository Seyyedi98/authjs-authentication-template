"use client";

import { newPassword } from "@/actions/auth/new-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CardWrapper } from "../ui/card-wrapper";
import { FormError } from "../ui/form/form-error";
import { FormSuccess } from "../ui/form/form-success";

export const CredentialsNewPasswordForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPanding, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Enter the new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Email field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPanding}
                      placeholder="password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPanding} type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
