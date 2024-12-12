import React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const customInputVariant = cva(
  "px-3 py-2 flex leading-4 w-full text-foreground rounded-md border dark:border-input/35 border-input/65 ring-offset-background bg-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-0 disabled:cursor-not-allowed disabled:opacity-35",
  {
    variants: {
      size: {
        sm: "h-12 text-sm",
        md: "h-14 text-base py-4",
        lg: "h-16 text-lg",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  }
);

const CustomInput = React.forwardRef(
  ({ className, type, size, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(customInputVariant({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CustomInput.displayName = "CustomInput";

const FloatingInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <CustomInput
      placeholder=" "
      className={cn("peer bg-transparent border-none", className)}
      ref={ref}
      {...props}
    />
  );
});
FloatingInput.displayName = "FloatingInput";

export { FloatingInput, CustomInput };
