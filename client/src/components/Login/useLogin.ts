import { useMutation, useQueryClient } from "@tanstack/react-query";
import ClientAPI from "../ClientAPI";
import { useNavigate } from "react-router-dom";

interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AddUserContext {
  previousUser: LoginResponse;
}

function useLogin(onLogin: () => void) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const Client = new ClientAPI<LoginRequest, LoginResponse>("/auth/login");

  return useMutation<LoginResponse, Error, LoginRequest, AddUserContext>({
    mutationFn: Client.login,
    onSuccess: (response) => {
      const previousUser = queryClient.setQueryData<LoginResponse>(
        ["user"],
        response
      );
      localStorage.setItem("userDetails", JSON.stringify(response));
      navigate(`/${response._id}`);
      onLogin();
      return previousUser;
    },
    onError: (error, _credentials, context) => {
      console.error("Login failed:", error);
      if (context?.previousUser) {
        queryClient.setQueryData(["user"], context.previousUser);
      }
    },
  });
}

export default useLogin;
