"use client";

import { otpLogin } from "@/actions/auth/otp-login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, OtpLoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CardWrapper } from "../ui/card-wrapper";
import { FormError } from "../ui/form/form-error";
import { FormSuccess } from "../ui/form/form-success";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { ArrowLeftIcon, Loader } from "lucide-react";

export const MobileLoginForm = () => {
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState("");

  const form = useForm({
    resolver: zodResolver(OtpLoginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "password",
      code: "",
    },
  });

  const isCodeEntered = form.watch("code");

  const onSubmit = (values) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      otpLogin(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          setSuccess(data.success);
        }

        if (data?.showOtpInput) {
          setShowOtpInput(true);
        }
      });
    });
  };

  return (
    <CardWrapper
      // headerLabel="خوش آمدید"
      backButtonLabel="حساب کاربری ندارید؟"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Email field */}
            {!showOtpInput && (
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره موبایل</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        pattern="\d*"
                        {...field}
                        disabled={isPending}
                        placeholder="09123456789"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* OTP Confirmation page */}
            {showOtpInput && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>کد یکبار مصرف</FormLabel>
                    <FormControl>
                      <InputOTP
                        {...field}
                        maxLength={6}
                        disabled={isPending}
                        pattern={REGEXP_ONLY_DIGITS}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      لطفا کد یکبار مصرف ارسال شده به موبایلتان را وارد کنید
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />

          {/* Enter mobile number */}
          {!showOtpInput && (
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? <Loader className="animate-spin" /> : "ارسال"}
            </Button>
          )}

          {/* Enter OTP Code */}
          {showOtpInput && !error && (
            <Button
              disabled={isPending || !isCodeEntered}
              type="submit"
              className="w-full"
            >
              {isPending ? <Loader className="animate-spin" /> : "ورود"}
            </Button>
          )}

          {/* Wrong OTP Code */}
          {showOtpInput && error && (
            <Link
              href="/"
              className="group flex w-full items-center justify-center gap-1 text-center"
            >
              <ArrowLeftIcon className="mt-1 h-4 w-4 duration-200 group-hover:-translate-x-1" />
              <span className="text-center text-sm">بازگشت</span>
            </Link>
          )}
        </form>
      </Form>
    </CardWrapper>
  );
};
