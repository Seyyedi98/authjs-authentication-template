"use client";

export const LoginButton = ({ children, mode = "redirect", asChild }) => {
  const onClick = () => {
    console.log("clicked");
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
