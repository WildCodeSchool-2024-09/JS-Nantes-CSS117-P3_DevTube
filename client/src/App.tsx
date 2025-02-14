import { Outlet } from "react-router-dom";
import "./styles/Globals.css";
import "./i18n";
import { useEffect, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import useAuth from "./utils/useAuth";
import useTheme from "./utils/useTheme";

function App() {
  const { theme } = useTheme();
  const [infoVideos, setInfoVideos] = useState();
  const [favUser, setFavUser] = useState();
  const { user } = useAuth();

  useEffect(() => {
    const urlForFavoritesUser = `${import.meta.env.VITE_API_URL}/api/favorites-user/${user?.id}`;
    recoverFavoritesUser(urlForFavoritesUser);
  }, [user?.id]);

  async function recoverFavoritesUser(url: string) {
    const token = localStorage.getItem("token");

    try {
      const request = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const datas = await request.json();
      setFavUser(datas);
      // console.log({ datas });
    } catch (err) {
      console.error(err);
    }
  }
  // console.log({ favUser });

  return (
    <>
      <Header />
      <main className={theme ? "light" : "dark"}>
        <Outlet context={{ infoVideos, setInfoVideos, favUser, setFavUser }} />
      </main>
      <Footer />
      <ToastContainer
        role="alert"
        aria-live="assertive"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
