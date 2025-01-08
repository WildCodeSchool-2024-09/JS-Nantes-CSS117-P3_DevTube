import { useTranslation } from "react-i18next";
import "../../styles/Freemium.css";
import bigStarFreenium from "/big-star-freenium.png";
import starWhite from "/star-white-icon.png";

export default function Freemium() {
  const { t } = useTranslation();

  return (
    <section className="page-fremium">
      <section className="title-fremium">
        <img className="orange-star-icon" src={bigStarFreenium} alt="star" />
        <h1>{t("title")}</h1>
      </section>
      <p className="intro-text-fremium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <section className="information-fremium">
        <figure className="block-information-fremium">
          <div className="card-information-fremium">
            <h2 className="card-block card-block-1">{t("card-title")}</h2>
            <p className="card-block card-block-2">{t("bonus-1")}</p>
            <p className="card-block card-block-3">{t("bonus-2")}</p>
            <p className="card-block card-block-4">{t("bonus-3")}</p>
            <div className="card-block-button">
              <button type="button" className="big-cta">
                sign up
                <span>
                  <img className="white-star-icon" src={starWhite} alt="" />
                </span>
              </button>
            </div>
          </div>
        </figure>
        <section className="articles-information-fremium">
          <article>
            <h2>{t("article-title-1")}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </article>
          <article>
            <h2>{t("article-title-2")}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim
            </p>
          </article>
          <article>
            <h2>{t("article-title-3")}</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </article>
        </section>
      </section>
    </section>
  );
}
