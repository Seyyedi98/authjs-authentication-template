import { auth, signOut } from "@/auth";

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
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default page;
