import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="w-full h-dvh flex flex-col gap-4 items-center justify-center">
      <p className="text-4xl">صفحه پیدا نشد!</p>
      <Link href="../">برگشت به صفحه اصلی</Link>
    </div>
  );
};

export default notFound;
