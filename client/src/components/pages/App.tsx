import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      const user = JSON.parse(userDetails);
      if (user) {
        navigate(`/${user._id}`);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);
  return <Outlet />;
}
