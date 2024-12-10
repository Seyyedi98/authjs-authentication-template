import React from "react";
import Navbar from "../_components/navbar/Navbar";

const ProtectedLayout = ({ children }) => {
  return (
    <div className="h-dvh w-full flex flex-col gap-y-10 items-center justify-center ">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
