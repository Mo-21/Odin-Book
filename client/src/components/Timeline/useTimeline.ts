import { useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";
import useAuth from "../Login/useAuth";

export interface PostResponse {
  _id: string;
  userId: string;
  content: string;
  img: string;
  likes: Array<string>;
  comments: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserId {
  id: string;
}

const useTimeline = () => {
  const [timeline, setTimeline] = useState<PostResponse[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState<string | null>(null);

  const user = useAuth();

  useEffect(() => {
    const getTimeline = async () => {
      const Client = new ClientAPI<UserId, PostResponse[]>(
        `/posts/timeline/${user?._id}`
      );
      try {
        const data = await Client.getTimeline();
        console.log(data);
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
  }, [user?._id]);

  return { timeline, isLoading, isError };
};

export default useTimeline;
