"use client";

import { logout } from "@/actions/auth/logout";

export const LogoutButton = ({ children, mode = "redirect", asChild }) => {
  const onClick = () => {
    logout();
  };

  if (mode === "modal") {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer w-full">
      {children}
    </span>
  );
};
