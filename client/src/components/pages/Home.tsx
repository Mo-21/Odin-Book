import Topbar from "../Topbar/Topbar";
import Feed from "../Feed/Feed";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="home-container">
        <Sidebar />
        <Feed />
        <Outlet />
      </div>
    </>
  );
}
