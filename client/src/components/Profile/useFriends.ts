import { useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";
import { UserId } from "../Timeline/useTimeline";
import { id } from "../Timeline/useAuthorDetails";

interface FriendsList {
  _id: string;
  username: string;
  profilePicture: string;
}

const useFriends = ({ userId }: id) => {
  const [friends, setFriendsList] = useState<FriendsList[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState<string | null>(null);

  useEffect(() => {
    const Client = new ClientAPI<UserId, FriendsList[]>(
      `users/friends/${userId}`
    );
    const fetchFriends = async () => {
      try {
        const data = await Client.fetchFriends();
        
        setFriendsList(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: Error | any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, [userId]);

  return { friends, isLoading, isError };
};

export default useFriends;
