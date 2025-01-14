import "../../styles/ProfilUser.css";

export default function ProfilUser() {
  return (
    <section className="section-my-account-container">
      <h1>My account</h1>

      {/* User informations */}
      <fieldset className="fieldset-container">
        <legend>My informations</legend>
        <p>Emily De Duyver</p>
        <p>I am student and I wish becoming front-end developper.</p>
        <p>Beginner</p>
        <p>emilie.deduyver@gmail.com</p>
        <p>Freemium member since on 12/12/24</p>
        <button type="submit" className="standard-button">
          Update
        </button>
      </fieldset>

      {/* Progression section */}
      <section className="section-progression-container">
        <h2>My progression</h2>
        <section className="section-progression-bar">
          <p className="progress-bar">Progress bar</p>
          <button type="button" className="big-cta">
            Continue
          </button>
        </section>
      </section>
    </section>
  );
}
