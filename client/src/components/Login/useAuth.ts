import { useQueryClient } from "@tanstack/react-query";
import { User } from "../Timeline/useAuthorDetails";

const useAuth = () => {
  const queryClient = useQueryClient();
  const user: User | undefined = queryClient.getQueryData(["user"]);
  return user;
};

export default useAuth;
