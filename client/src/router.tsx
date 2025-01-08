import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Course from "./styles/Course/Course";
import Testimonials from "./components/Testimonials/Testimonials";

export const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);
