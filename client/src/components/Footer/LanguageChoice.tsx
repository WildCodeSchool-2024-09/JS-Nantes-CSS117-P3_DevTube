import arrowDropdownMenu from "/arrow-dropdown-menu-for-dark-theme.png";
import "../../styles/Footer.css";

export default function LanguageChoice() {
  return (
    <section className="dropdown-language-choice">
      <div className="dropdown-label">
        <p className="dropdown-label-text" />
        <button type="button" className="dropdown-btn">
          <img
            src={arrowDropdownMenu}
            alt="arrow"
            className="arrow-dropdown-menu-language"
          />
        </button>
      </div>
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
    </section>
  );
}
