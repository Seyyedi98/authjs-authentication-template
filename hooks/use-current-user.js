import { useSession } from "next-auth/react";

// It's react hook and only works on client component
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
