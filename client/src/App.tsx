import { Outlet } from "react-router-dom";
import "./styles/Globals.css";
import "./i18n";

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
