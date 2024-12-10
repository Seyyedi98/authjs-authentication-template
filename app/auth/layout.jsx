import Link from "next/link";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="h-dvh">
      <nav className="bg-red-500 p-4 text-white flex gap-4 font-semibold absolute w-full">
        <Link href="/auth/login">ورود</Link>
        <Link href="/auth/register">عضویت</Link>
      </nav>
      <div className="p-4 text-lg h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default layout;
