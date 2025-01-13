import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TeamProfil from "./pages/TeamProfil/TeamProfil";
import Course from "./styles/Course/Course";

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
        path: "/TeamProfil",
        element: <TeamProfil />,
      },
    ],
  },
  // Try adding a new route! For example, "/about" with an About component
]);
