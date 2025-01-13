import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import TeamProfil from "./pages/TeamProfil/TeamProfil";
import Course from "./pages/Course/Course";
import Freemium from "./pages/Freemium/Freemium";
import Login from "./pages/Login/Login";
import Subscribe from "./pages/Subsribe/Subscribe";

export const router = createBrowserRouter([
	{
		path: "/", // The root path
		element: <App />, // Renders the App component for the home page
		children: [
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
				path: "/TeamProfil",
				element: <TeamProfil />,
			},
			{
				path: "/freemium",
				element: <Freemium />,
			},
		],
	},
	// Try adding a new route! For example, "/about" with an About component
]);
