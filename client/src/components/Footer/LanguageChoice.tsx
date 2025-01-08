import arrowDropdownMenu from "/arrow-dropdown-menu-for-dark-theme.png";
import "../../styles/Footer.css";
import { useState } from "react";

export default function LanguageChoice() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <section className="dropdown-language-choice">
      <div className="dropdown-label">
        <p className="dropdown-label-text" />
        <button type="button" className="dropdown-btn" onClick={handleClick}>
          <img
            src={arrowDropdownMenu}
            alt="arrow"
            className="arrow-dropdown-menu-language"
          />
        </button>
      </div>
      {isMenuOpen ? (
        <div id="dropdown-language" className="dropdown-content">
          <button
            type="button"
            className="choice-language-button"
            data-language="en"
          >
            EN
          </button>
          <button
            type="button"
            className="choice-language-button"
            data-language="fr"
          >
            FR
          </button>
          <button
            type="button"
            className="choice-language-button choice-spanish-button"
            data-language="sp"
          >
            SP
          </button>
        </div>
      ) : null}
    </section>
  );
}
