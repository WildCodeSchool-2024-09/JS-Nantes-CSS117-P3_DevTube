import { Link, NavLink, useNavigate } from "react-router-dom";
import "../../styles/Header.css";
import { useState } from "react";
import useAuth from "../../utils/useAuth";
import useTheme from "../../utils/useTheme";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const { theme, setTheme } = useTheme();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleClick() {
    setOpenSearchBar(!openSearchBar);
  }

  function handleLogoutBtnClick() {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/logout-success");
  }

  return (
    <header className={`header-container ${theme ? "light" : "dark"}`}>
      <section className="devTube-logo-title">
        <img
          className="header-logo-devTube"
          src="/public/logo-devTube.png"
          alt="Le logo de devTube se compose de deux accolades entourant un symbole lecture."
        />
        <Link to={"/"}>
          <p className="devTube-title">devTube</p>
        </Link>
      </section>
      <section className="section-nav-container">
        <button type="button" aria-label="Burger button." onClick={toggleMenu}>
          <img
            className="btn-burger-menu"
            src="/public/burger-menu.png"
            alt="menu icon"
          />
        </button>
        <nav className={`header-nav-container ${isOpen ? "show" : ""}`}>
          <ul>
            <li>
              <NavLink to={"/TeamProfil"}>About</NavLink>
            </li>
            <li>
              <NavLink to={"/course"}>Course</NavLink>
            </li>
            <li>
              <NavLink to={"/freemium"}>Freemium</NavLink>
            </li>
            <li>
              <NavLink to={"/testimonials"}>Testimonials</NavLink>
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
        style={{
          backgroundImage: `url(${theme ? "/public/search-icon-for-light-theme.png" : "/public/search-bar.png"})`,
        }}
      />

      <button
        type="button"
        onClick={() => setTheme(!theme)}
        className="button-switch-theme"
      >
        <img
          className="icon-switch-theme"
          src={theme ? "/public/dark_mode.png" : "/public/light_mode.png"}
          alt="switch theme icon"
        />
      </button>

      <section className="login-sign-up-container">
        {auth ? (
          <button
            type="button"
            className="btn-logout"
            onClick={handleLogoutBtnClick}
          >
            {/* TODO: faire une page d"aterrisage pour dire Vous etes bien deconnecte merci bonsoir + onclick -> efface le token et navigate vers /logout-success*/}
            Log out
          </button>
        ) : (
          <NavLink to={"/login"} className="btn-login">
            Log in
          </NavLink>
        )}
        {!auth && (
          <NavLink to={"/subscribe"} className="little-cta">
            Sign up
          </NavLink>
        )}
      </section>
    </header>
  );
}
