import { Outlet } from "react-router-dom";
import "./styles/Globals.css";
import "./i18n";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import useTheme from "./utils/useTheme";

import { Bounce, ToastContainer } from "react-toastify";

function App() {
	const { theme } = useTheme();
	return (
		<>
			<Header />
			<main className={`${theme ? "light" : "dark"}`}>
				<Outlet />
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
