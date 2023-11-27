import Post from "../postInput/Post";
import Timeline from "../timeline/Timeline";

export default function Feed() {
  return (
    <div className="feed">
      <Post />
      <Timeline />
    </div>
  );
}
