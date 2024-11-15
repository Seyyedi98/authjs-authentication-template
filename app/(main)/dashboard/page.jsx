import { auth, signOut } from "@/auth";
import Link from "next/link";

const page = async () => {
  const session = await auth();

  return (
    <div>
      <Link href="/settings">Settings</Link>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default page;
