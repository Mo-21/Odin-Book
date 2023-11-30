import "../../assets/App.css";
import Profile from "../Profile/Profile";
import Median from "../Profile/Median";

export default function PersonalProfile() {
  return (
    <>
      <div className="profile-page-ultimate-container">
        <Profile />
        <Median />
      </div>
    </>
  );
}
