import { Outlet } from "react-router-dom";
import "./styles/Globals.css";
import "./i18n";
import Header from "./components/Header/Header";


function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
