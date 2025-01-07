import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Course from "./components/Header/Header.tsx";

export const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/course",
        element: <Course />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);
