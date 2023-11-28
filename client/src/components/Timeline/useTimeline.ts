import { useEffect, useState } from "react";
import ClientAPI from "../ClientAPI";

export interface Post {
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
  const [timeline, setTimeline] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState<string | null>(null);

  console.log(timeline);
  useEffect(() => {
    const getTimeline = async () => {
      const Client = new ClientAPI<UserId, Post[]>(
        "/posts/timeline/6563f2e8f849e547a02c43cb"
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

  return { timeline, isLoading, isError };
};

export default useTimeline;
