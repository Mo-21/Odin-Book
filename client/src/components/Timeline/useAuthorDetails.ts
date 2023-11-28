import { useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  coverPicture: string;
  followers: string[];
  followings: string[];
  isAdmin: boolean;
  bio: string;
  city: string;
  from: string;
  relationship: number | null;
  createdAt: string;
}

type id = {
  userId: string;
};

const useAuthorDetails = ({ userId }: id) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const Client = new ClientAPI<id, User>(`/users/${userId}`);
      try {
        const res = await Client.getUser();
        console.log(res);
        setUser(res);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: Error | any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

export default useAuthorDetails;
