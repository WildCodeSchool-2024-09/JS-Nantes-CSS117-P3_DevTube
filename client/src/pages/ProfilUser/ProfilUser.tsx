import "../../styles/ProfilUser.css";

export default function ProfilUser() {
  return (
    <section className="section-my-account-container">
      <h1>My account</h1>

      {/* User informations */}
      <fieldset className="fieldset-container">
        <legend>My informations</legend>

        <form>
          <input
            type="text"
            name="firstname"
            aria-labelledby="firstname"
            placeholder="Emily De Duyver"
            required
          />

          <p>I am student and I wish becoming front-end developper.</p>
          <p>Beginner</p>

          <input
            type="text"
            name="firstname"
            aria-labelledby="firstname"
            placeholder="emilie.deduyver@gmail.com"
            required
          />

          <p>Freemium member since on 12/12/24</p>

          <button type="submit" className="standard-button">
            Update
          </button>
        </form>
      </fieldset>

      {/* Progression section */}
      <section className="section-progression-container">
        <h2>My progression</h2>
        <section className="section-progression-bar">
          <p className="progress-bar">Progress bar</p>
          <button type="button" className="little-cta">
            Continue
          </button>
        </section>
      </section>
    </section>
  );
}
