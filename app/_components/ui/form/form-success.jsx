import { CheckCircledIcon } from "@radix-ui/react-icons";

export const FormSuccess = ({ message }) => {
  if (!message) return;

  return (
    <div
      className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2
 text-sm text-emerald-500"
    >
      <CheckCircledIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
