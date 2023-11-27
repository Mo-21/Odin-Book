import Topbar from "./Topbar/Topbar";
import Feed from "./feed/Feed";
import Sidebar from "./sidebar/Sidebar";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="home-container">
        <Sidebar />
        <Feed />
      </div>
    </>
  );
}
