import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../Login/useAuth";
import { useEffect } from "react";

export default function App() {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/${user._id}`);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return <Outlet />;
}
