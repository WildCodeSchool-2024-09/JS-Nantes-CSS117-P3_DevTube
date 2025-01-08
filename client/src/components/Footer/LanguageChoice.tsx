import arrowDropdownMenu from "/arrow-dropdown-menu-for-dark-theme.png";
import "../../styles/Footer.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageChoice() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
  };

  const traduction = t("language");
  return (
    <section className="dropdown-language-choice">
      <div className="dropdown-label">
        <p className="dropdown-label-text">{traduction}</p>
        <button type="button" className="dropdown-btn" onClick={handleClick}>
          <img
            src={arrowDropdownMenu}
            alt="arrow to dropdown menu"
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
            onClick={(e) =>
              handleLanguageChange(e.currentTarget.dataset.language as string)
            }
          >
            EN
          </button>
          <button
            type="button"
            className="choice-language-button"
            data-language="fr"
            onClick={(e) =>
              handleLanguageChange(e.currentTarget.dataset.language as string)
            }
          >
            FR
          </button>
          <button
            type="button"
            className="choice-language-button choice-spanish-button"
            data-language="sp"
            onClick={(e) =>
              handleLanguageChange(e.currentTarget.dataset.language as string)
            }
          >
            SP
          </button>
        </div>
      ) : null}
    </section>
  );
}
