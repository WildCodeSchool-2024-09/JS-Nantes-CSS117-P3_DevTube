import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import FormUserAdmin from "./components/FormUserAdmin/FormUserAdmin";
import About from "./pages/About/About";
import AddVideo from "./pages/Admin/AddVideo";
import Admin from "./pages/Admin/Admin";
import AdminVideoManager from "./pages/Admin/AdminVideoManager";
import CreateCategory from "./pages/Admin/CreateCategory";
import UpdateDeleteVideo from "./pages/Admin/UpdateDeleteVideo";
import Course from "./pages/Course/Course";
import Freemium from "./pages/Freemium/Freemium";
import Login from "./pages/Login/Login";
import Logout from "./pages/Logout/Logout";
import ProfilUser from "./pages/ProfilUser/ProfilUser";
import Subscribe from "./pages/Subsribe/Subscribe";
import TeamProfile from "./pages/TeamProfile/TeamProfile";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
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
        children: [
          {
            path: "user-manager",
            element: <FormUserAdmin />,
          },
          {
            path: "video-manager",
            element: <AdminVideoManager />,
            children: [
              {
                path: "update-delete-video",
                element: <UpdateDeleteVideo />,
              },
              {
                path: "add-video",
                element: <AddVideo />,
              },
              {
                path: "create-category",
                element: <CreateCategory />,
              },
            ],
          },
        ],
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
        path: "/teamProfil",
        element: <TeamProfile />,
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
        path: "/profil-user",
        element: <ProfilUser />,
      },
      {
        path: "/video/:id",
        element: <VideoPlayer />,
        loader: async ({ params }) => {
          try {
            const token = localStorage.getItem("token");
            const response = await fetch(
              `${import.meta.env.VITE_API_URL}/api/videos/${params.id}`,
              { headers: { Authorization: `Bearer ${token}` } },
            );

            if (response.ok) {
              const videoResponse = await response.json();
              return videoResponse;
            }

            if (response.status === 403) {
              return {
                error: 403,
              };
            }

            if (response.status) {
              return {
                error: response.status,
              };
            }
          } catch (error) {
            console.error("Error fetching video: ", error);
            return null;
          }
        },
      },
      {
        path: "/testimonials",
        element: <Testimonials />,
      },
      {
        path: "/logout-success",
        element: <Logout />,
      },
    ],
  },
]);
