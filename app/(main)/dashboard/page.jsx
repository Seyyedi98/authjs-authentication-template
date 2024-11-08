import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();

  return <div>user: {JSON.stringify(session)}</div>;
};

export default page;
