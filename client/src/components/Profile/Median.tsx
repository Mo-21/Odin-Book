import useUserPosts from "./useUserPosts";
import { useParams } from "react-router-dom";
import ProfilePosts from "./ProfilePosts";

export default function Median() {
  const userId = useParams();
  const { timeline, isLoading, isError } = useUserPosts({ userId: userId.id! });
  console.log(timeline);
  return (
    <div className="personalPage-group">
      {isLoading && <div>isLoading...</div>}
      {isError && <div>{isError}</div>}
      {!isLoading && !isError && timeline.length === 0 && <div>No posts</div>}
      {!isLoading &&
        !isError &&
        timeline.length > 0 &&
        timeline.map((post) => {
          return <ProfilePosts key={post._id} post={post} />;
        })}
    </div>
  );
}
