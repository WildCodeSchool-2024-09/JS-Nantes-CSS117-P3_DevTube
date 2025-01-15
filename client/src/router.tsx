import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Course from "./pages/Course/Course";
import Freemium from "./pages/Freemium/Freemium";
import Login from "./pages/Login/Login";
import Subscribe from "./pages/Subsribe/Subscribe";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
import HomePage from "./pages/homePage/HomePage";
import Testimonials from "./pages/testimonial/Testimonial";

export const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/",
        element: <HomePage />,
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
        path: "/video/:id",
        element: <VideoPlayer />,
        loader: ({ params }) => {
          return fetch(`http://localhost:3310/api/videos/${params.id}`);
        },
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);
