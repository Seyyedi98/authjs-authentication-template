import { auth, signOut } from "@/auth";
import { Link } from "lucide-react";
import React from "react";

const page = async () => {
  const session = await auth();

  return (
    <div>
      <div>user: {JSON.stringify(session)}</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Signout</button>
      </form>
    </div>
  );
};

export default page;
