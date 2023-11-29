import { useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";
import { PostResponse, UserId } from "../Timeline/useTimeline";
import { id } from "../Timeline/useAuthorDetails";

const useUserPosts = ({ userId }: id) => {
  const [timeline, setTimeline] = useState<PostResponse[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTimeline = async () => {
      const Client = new ClientAPI<UserId, PostResponse[]>(
        `/posts/profile/${userId}`
      );
      try {
        const data = await Client.getTimeline();
        setTimeline(
          data.sort((p1, p2) => {
            return (
              new Date(p2.createdAt).getTime() -
              new Date(p1.createdAt).getTime()
            );
          })
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: Error | any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };
    getTimeline();
  }, [userId]);

  return { timeline, isLoading, isError };
};

export default useUserPosts;
