import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import React from "react";
import BackButton from "../../auth/back-button";
import { CardWrapper } from "../card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="یه چیزی اشتباهه!"
      backButtonHref="/auth/login"
      backButtonLabel="برگشت به صفحه ی ورود"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className=" text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
