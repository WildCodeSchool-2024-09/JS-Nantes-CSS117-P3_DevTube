import { NavLink } from "react-router-dom";
import "../../styles/Header.css";
import { useState } from "react";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [openSearchBar, setOpenSearchBar] = useState(false);

	function toggleMenu() {
		setIsOpen(!isOpen);
	}

	function handleClick() {
		setOpenSearchBar(!openSearchBar);
	}

	return (
		<header className="header-container">
			<section className="devTube-logo-title">
				<img
					className="header-logo-devTube"
					src="logo-devTube.png"
					alt="Le logo de devTube se compose de deux accolades entourant un symbole lecture."
				/>
				<p className="devTube-title">devTube</p>
			</section>
			<section className="section-nav-container">
				<button type="button" aria-label="Burger button." onClick={toggleMenu}>
					<img className="btn-burger-menu" src="burger-menu.png" alt="" />
				</button>
				<nav className={`header-nav-container ${isOpen ? "show" : ""}`}>
					<ul>
						<li>
							<NavLink to={"/teamprofil"}>About</NavLink>
						</li>
						<li>
							<NavLink to={"/course"}>Course</NavLink>
						</li>
						<li>
							<NavLink to={"/freemium"}>Freemium</NavLink>
						</li>
						<li>
							<NavLink to={""}>Testimonials</NavLink>
						</li>
						<li>
							<NavLink to={"/login"}>Login</NavLink>
						</li>
						<li>
							<NavLink to={"/subscribe"}>Sign up</NavLink>
						</li>
						<li>
							<input
								type="text"
								className="search-bar-burger-menu"
								aria-label="Search"
								placeholder="Search..."
							/>
						</li>
					</ul>
				</nav>
			</section>
			<input
				type="text"
				className={`search-bar ${openSearchBar ? "unfold" : ""}`}
				onClick={handleClick}
				aria-label="Search"
				placeholder={`${openSearchBar ? "Search..." : ""}`}
			/>
			<img className="img-light-mode" src="light_mode.png" alt="" />
			<section className="login-sign-up-container">
				<NavLink to={"/login"} className="btn-login">
					Login
				</NavLink>
				<NavLink to={"/subscribe"} className="little-cta">
					Sign up
				</NavLink>
			</section>
		</header>
	);
}
