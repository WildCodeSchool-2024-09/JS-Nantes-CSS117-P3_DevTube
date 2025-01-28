import { Outlet } from "react-router-dom";
import "./styles/Globals.css";
import "./i18n";
import { Bounce, ToastContainer } from "react-toastify";
import { useState } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import useTheme from "./utils/useTheme";

function App() {
  const { theme } = useTheme();
  const [infoVideos, setInfoVideos] = useState();

  return (
    <>
      <Header />
      <main className={theme ? "light" : "dark"}>
        <Outlet context={{ infoVideos, setInfoVideos }} />
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
