import "../../styles/Subscribe.css";

export default function Subscribe() {
  return (
    <section className="main-form-subscribe">
      <form action="submit" method="get" className="form-subscribe-container">
        {/* Section firstname */}
        <section className="form-subscribe-label">
          <label id="firstname" htmlFor="firstname">
            First name
          </label>
          <input
            type="text"
            name="firstname"
            aria-labelledby="firstname"
            placeholder="Enter your firstname."
            required
          />
        </section>

        {/* Section lastname */}
        <section className="form-subscribe-label">
          <label id="lastname" htmlFor="lastname">
            Last name
          </label>
          <input
            type="text"
            name="lastname"
            aria-labelledby="lastname"
            placeholder="Enter your lastname."
            required
          />
        </section>

        {/* Section email */}
        <section className="form-subscribe-label">
          <label id="email" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            aria-labelledby="email"
            placeholder="Enter your email."
            required
          />
        </section>

        {/* Section password */}
        <section className="form-subscribe-label">
          <label id="password" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            aria-labelledby="password"
            placeholder="Enter your password."
            required
          />
        </section>

        {/* Section confirmpassword */}
        <section className="form-subscribe-label">
          <label id="confirm-password" htmlFor="confirm-password">
            Confirm your password
          </label>
          <input
            type="password"
            name="confirm-password"
            aria-labelledby="confirm-password"
            placeholder="Enter your password."
            required
          />
        </section>
        <button type="button" className="little-cta">
          Sign up
        </button>
      </form>
    </section>
  );
}
