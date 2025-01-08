import "../../styles/Freemium.css";
import bigStarFreenium from "/big-star-freenium.png";

export default function Freemium() {
  return (
    <section className="page-freemium">
      <section className="title-freemium">
        <img className="orange-star-icon" src={bigStarFreenium} alt="star" />
        <h1>Freemium</h1>
      </section>
      <p className="intro-text-freemium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </section>
  );
}
