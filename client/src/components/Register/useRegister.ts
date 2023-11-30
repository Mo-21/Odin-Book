import { useMutation, useQueryClient } from "@tanstack/react-query";
import ClientAPI from "../ClientAPI";
import { useNavigate } from "react-router-dom";

interface RegistrationRequest {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegistrationResponse {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AddUserContext {
  previousUser: RegistrationResponse;
}

function useRegister(onRegister: () => void) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const Client = new ClientAPI<RegistrationRequest, RegistrationResponse>(
    "/auth/register"
  );

  return useMutation<
    RegistrationResponse,
    Error,
    RegistrationRequest,
    AddUserContext
  >({
    mutationFn: Client.login,
    onSuccess: (response) => {
      const previousUser = queryClient.setQueryData<RegistrationResponse>(
        ["user"],
        response
      );
      navigate(`/${response._id}`);
      onRegister();
      return previousUser;
    },
  });
}

export default useRegister;
