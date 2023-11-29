import { User } from "../Timeline/useAuthorDetails";

const useAuth = () => {
  const userDetails = localStorage.getItem("userDetails");
  const parsedUserDetails: User = userDetails ? JSON.parse(userDetails) : null;
  return parsedUserDetails;
};

export default useAuth;
