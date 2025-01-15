import "../../styles/Login.css";

export default function Login() {
  return (
    <section className="main-form-login">
      <form action="submit" method="get" className="form-login-container">
        {/* Section username */}
        <section className="form-login-label">
          <label id="username" htmlFor="username">
            User name
          </label>
          <input
            type="text"
            name="username"
            aria-labelledby="username"
            placeholder="Enter your username."
            required
          />
        </section>

        {/* Section password */}
        <section className="form-login-label">
          <label id="password" htmlFor="password">
            Password
          </label>
          <input
            type="text"
            name="password"
            aria-labelledby="password"
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
