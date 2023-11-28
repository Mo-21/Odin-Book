import { useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";

export interface Post {
  _id: string;
  userId: string;
  content: string;
  likes: Array<string>;
  comments: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserId {
  id: string;
}

const useTimeline = () => {
  const [timeline, setTimeline] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(timeline);
  useEffect(() => {
    const getTimeline = async () => {
      const Client = new ClientAPI<UserId, Post[]>(
        "/posts/timeline/65640905dd86102a984e72ff"
      );
      try {
        const data = await Client.getTimeline();
        setTimeline(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: Error | any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };
    getTimeline();
  }, []);

  return { timeline, loading, error };
};

export default useTimeline;
