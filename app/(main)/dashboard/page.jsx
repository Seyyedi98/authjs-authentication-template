import { auth } from "@/auth";
import Link from "next/link";

const page = async () => {
  const session = await auth();

  return (
    <div>
      <Link href="/settings">Settings</Link>
    </div>
  );
};

export default page;
