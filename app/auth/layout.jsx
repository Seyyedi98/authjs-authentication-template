import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <nav className="bg-red-500 p-4 text-white flex gap-4 font-semibold">
        <Link href="/auth/login">ورود</Link>
        <Link href="/auth/register">عضویت</Link>
      </nav>
      <div className="p-4 text-lg">{children}</div>
    </div>
  );
};

export default layout;
