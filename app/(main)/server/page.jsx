import { UserInfo } from "@/app/_components/profile/user-info";
import { auth } from "@/auth";
import { currentUser } from "@/lib/get-user";
import React from "react";

const ServerPage = async () => {
  const user = await currentUser();
  return <UserInfo user={user} label="Server component" />;
};

export default ServerPage;
