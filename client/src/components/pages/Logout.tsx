import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function Logout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogout = () => {
    queryClient.clear();
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  return (
    <button className="links timeline-link" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
