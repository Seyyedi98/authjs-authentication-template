"use client";
import { useSession, signOut } from "next-auth/react";
import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  const session = useSession();

  const onClick = () => {
    logout();
  };

  return (
    <>
      <div>user: {JSON.stringify(session)}</div>
      <div>SettingsPage</div>
      <Button onClick={onClick} type="submit">
        Logout
      </Button>
    </>
  );
};

export default SettingsPage;
