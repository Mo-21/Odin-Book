import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./Login/Login";
import Register from "./Register/Register";
import App from "./pages/App";
import { Logout } from "@mui/icons-material";
import PersonalProfile from "./pages/PersonalProfile";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        path: ":id",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <PersonalProfile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

export default router;
