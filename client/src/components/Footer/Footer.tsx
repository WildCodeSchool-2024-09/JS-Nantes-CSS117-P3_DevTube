import fbIcon from "/fb-icon-for-dark-theme.png";
import instaIcon from "/insta-icon-for-dark-theme.png";
import xIcon from "/x-icon-for-dark-theme.png";
import LanguageChoice from "./LanguageChoice";
import "../../styles/Footer.css";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <LanguageChoice />
      <section className="social-network-footer">
        <img className="social-icon" src={fbIcon} alt="Facebook icon" />
        <img className="social-icon" src={instaIcon} alt="Insta icon" />
        <img className="social-icon" src={xIcon} alt="X icon" />
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
