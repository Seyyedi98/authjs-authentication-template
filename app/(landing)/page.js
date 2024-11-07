import React from "react";
import { LoginButton } from "../_components/auth/login-button";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <h1>Title</h1>
      <p>this is a text</p>
      <LoginButton>
        <Button>شروع</Button>
      </LoginButton>
    </div>
  );
};

export default page;
