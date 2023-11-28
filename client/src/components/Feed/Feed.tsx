import Post from "../PostInput/Post";
import Timeline from "../Timeline/Timeline";
import useTimeline from "../Timeline/useTimeline";

export default function Feed() {
  const { timeline, loading, error } = useTimeline();

  return (
    <div className="feed">
      <Post />
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {!loading && !error && timeline.length === 0 && <div>No posts</div>}
      {!loading &&
        !error &&
        timeline.length > 0 &&
        timeline.map((post) => {
          return <Timeline key={post._id} post={post} />;
        })}
    </div>
  );
}
