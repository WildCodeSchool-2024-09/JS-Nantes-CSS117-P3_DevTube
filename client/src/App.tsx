import { Outlet } from "react-router-dom";
import "./styles/Globals.css";

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
