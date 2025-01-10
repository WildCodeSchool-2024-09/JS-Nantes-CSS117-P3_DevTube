import "../../styles/Login.css";

export default function Login() {
  return (
    <section className="main-form-login">
      <form action="submit" method="get" className="form-login-container">
        <ul>
          <li className="form-login-label">
            <label id="username" htmlFor="username">
              Username
            </label>
          </li>
          <li>
            <input
              type="text"
              name="username"
              aria-labelledby="username"
              placeholder="Enter your username."
              required
            />
          </li>
        </ul>
        <ul>
          <li className="form-login-label">
            <label id="password" htmlFor="password">
              Password
            </label>
          </li>
          <li>
            <input
              type="text"
              name="password"
              aria-labelledby="password"
              placeholder="Enter your password."
              required
            />
          </li>
        </ul>
        <button type="button" className="little-cta">
          Sign up
        </button>
      </form>
    </section>
  );
}
