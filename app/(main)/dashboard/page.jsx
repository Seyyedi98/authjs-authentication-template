import { auth } from "@/auth";
import { Link } from "lucide-react";
import React from "react";

const page = async () => {
  const session = await auth();

  return (
    <div>
      <div>user: {JSON.stringify(session)}</div>
    </div>
  );
};

export default page;
