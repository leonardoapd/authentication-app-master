import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   action: () => import("./Components/Home/Home.jsx"),
  // },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  }
  // {
  //   path: "/dashboard",
  //   action: () => import("./Components/Dashboard/Dashboard.jsx"),
  // },
  // {
  //   path: "/profile",
  //   action: () => import("./Components/Profile/Profile.jsx"),
  // },
  // {
  //   path: "/settings",
  //   action: () => import("./Components/Settings/Settings.jsx"),
  // },
  // {
  //   path: "/404",
  //   action: () => import("./Components/NotFound/NotFound.jsx"),
  // },
  // {
  //   path: "/500",
  //   action: () => import("./Components/ServerError/ServerError.jsx"),
  // },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
