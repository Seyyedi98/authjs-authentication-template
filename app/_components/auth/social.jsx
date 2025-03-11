"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "@/components/ui/button";
import { SofaIcon } from "lucide-react";

const Social = () => {
  const onClick = (provider) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outlie"
        onClick={() => onClick("google")}
      >
        <SofaIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
