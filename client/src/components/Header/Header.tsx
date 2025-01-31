import { Link, NavLink } from "react-router-dom";
import "../../styles/Header.css";
import { useState } from "react";
import useTheme from "../../utils/useTheme";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const { theme, setTheme } = useTheme();
  const token = localStorage.getItem("token"); // TODO => Adapter lors de l'authentification globale
  const [isLogged] = useState(false); // TODO => Adapter lors de l'authentification globale

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleClick() {
    setOpenSearchBar(!openSearchBar);
  }

  // useEffect(() => {
  //   // TODO => Adapter lors de l'authentification globale
  //   // setIsLogged(!isLogged);
  // }, [isLogged]);

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
              <NavLink to={"/"} onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/TeamProfil"} onClick={toggleMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to={"/course"} onClick={toggleMenu}>
                Course
              </NavLink>
            </li>
            <li>
              <NavLink to={"/freemium"} onClick={toggleMenu}>
                Freemium
              </NavLink>
            </li>
            <li>
              <NavLink to={"/testimonials"} onClick={toggleMenu}>
                Testimonials
              </NavLink>
            </li>
            <li>
              {!token && isLogged ? (
                <NavLink to={"/profil-user"} onClick={toggleMenu}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}/assets/images/userprofil/avatar/user-profile-ircle.png`}
                    alt=""
                  />
                </NavLink>
              ) : (
                <NavLink to={"/login"} onClick={toggleMenu}>
                  Login
                </NavLink>
              )}
            </li>
            <li>
              <NavLink to={"/subscribe"} onClick={toggleMenu}>
                Sign up
              </NavLink>
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
        {!token ? (
          <NavLink to={"/login"} className="btn-login">
            Login
          </NavLink>
        ) : (
          <NavLink to={"/profil-user"} className="btn-login">
            <img
              src={`${import.meta.env.VITE_API_URL}/assets/images/userprofil/avatar/user-profile-ircle.png`}
              alt=""
              className="user-profile-logo"
            />
          </NavLink>
        )}

        <NavLink to={"/subscribe"} className="little-cta">
          Sign up
        </NavLink>
      </section>
    </header>
  );
}
