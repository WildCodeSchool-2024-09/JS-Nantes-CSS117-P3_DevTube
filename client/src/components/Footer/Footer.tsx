import LanguageChoice from "./LanguageChoice";
import "../../styles/Footer.css";
import { useTranslation } from "react-i18next";
import useTheme from "../../utils/useTheme";

export default function Footer() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <footer>
      <LanguageChoice />
      <section className="social-network-footer">
        <img
          className="social-icon"
          src={
            theme ? "fb-icon-for-light-theme.png" : "fb-icon-for-dark-theme.png"
          }
          alt="Facebook icon"
        />
        <img
          className="social-icon"
          src={
            theme
              ? "insta-icon-for-light-theme.png"
              : "insta-icon-for-dark-theme.png"
          }
          alt="Insta icon"
        />
        <img
          className="social-icon"
          src={
            theme ? "x-icon-for-light-theme.png" : "x-icon-for-dark-theme.png"
          }
          alt="X icon"
        />
      </section>
      <section className="text-footer">
        <p className="copyright">
          &copy; 2024 <span>DevTube</span> Team
        </p>
        <nav className="nav-footer">
          <p className="link-nav-footer">{t("cookies")}</p>
          {/*  TODO  => CHANGE FOR LINK WHEN THE PAGE WILL BE DONE */}
          <p className="link-nav-footer">{t("legal notices")}</p>
          {/* TODO  => CHANGE FOR LINK WHEN THE PAGE WILL BE DONE */}
          <p className="link-nav-footer link-confidentiality">
            {t("confidentiality policy")}
          </p>
          {/* TODO  => CHANGE FOR LINK WHEN THE PAGE WILL BE DONE */}
        </nav>
      </section>
    </footer>
  );
}
