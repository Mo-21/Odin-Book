import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./Profile/Profile";
import Login from "./Login/Login";
import Register from "./Register/Register";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
  {
    path: "profile/:id",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
