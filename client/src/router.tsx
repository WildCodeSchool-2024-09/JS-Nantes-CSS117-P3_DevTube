import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import About from "./pages/About/About";
import Admin from "./pages/Admin/Admin";
import Course from "./pages/Course/Course";
import Freemium from "./pages/Freemium/Freemium";
import Login from "./pages/Login/Login";
import ProfilUser from "./pages/ProfilUser/ProfilUser";
import Subscribe from "./pages/Subsribe/Subscribe";
import HomePage from "./pages/homePage/HomePage";
import Testimonials from "./pages/testimonial/Testimonial";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/subscribe",
        element: <Subscribe />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/freemium",
        element: <Freemium />,
      },
      {
        path: "/profiluser",
        element: <ProfilUser />,
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
