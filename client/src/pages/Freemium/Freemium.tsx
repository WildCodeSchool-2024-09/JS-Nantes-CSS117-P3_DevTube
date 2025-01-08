import "../../styles/Freemium.css";
import bigStarFreenium from "/big-star-freenium.png";
import starWhite from "/star-white-icon.png";

export default function Freemium() {
  return (
    <section className="page-freenium">
      <section className="title-freenium">
        <img className="orange-star-icon" src={bigStarFreenium} alt="star" />
        <h1>Freemium</h1>
      </section>
      <p className="intro-text-freenium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <section className="information-freenium">
        <figure className="block-information-freenium">
          <div className="card-information-freenium">
            <h2 className="card-block card-block-1">card-title</h2>
            <p className="card-block card-block-2">"bonus-1"</p>
            <p className="card-block card-block-3">"bonus-2"</p>
            <p className="card-block card-block-4">"bonus-3"</p>
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
      </section>
    </section>
  );
}
