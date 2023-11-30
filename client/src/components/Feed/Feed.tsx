import Post from "../PostInput/Post";
import Timeline from "../Timeline/Timeline";
import useTimeline from "../Timeline/useTimeline";

export default function Feed() {
  const { timeline, isLoading, isError } = useTimeline();

  return (
    <div className="feed">
      <Post />
      {isLoading && <div>Loading...</div>}
      {isError && <div>{isError}</div>}
      {!isLoading && !isError && timeline.length === 0 && <div>No posts</div>}
      {!isLoading &&
        !isError &&
        timeline.length > 0 &&
        timeline.map((post) => {
          return <Timeline key={post._id} post={post} />;
        })}
    </div>
  );
}
