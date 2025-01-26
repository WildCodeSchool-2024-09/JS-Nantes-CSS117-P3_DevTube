import { Outlet } from "react-router-dom";
import "./styles/Globals.css";
import "./i18n";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import useTheme from "./utils/useTheme";

function App() {
  const { theme } = useTheme();
  return (
    <>
      <Header />
      <main className={`${theme ? "light" : "dark"} form-admin-container`}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
