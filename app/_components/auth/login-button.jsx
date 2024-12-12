"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { MobileLoginForm } from "./mobile-login-form";

export const LoginButton = ({ children, mode = "redirect", asChild }) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent">
          <DialogTitle className="hidden"></DialogTitle>
          <MobileLoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
