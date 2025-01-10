import "../../styles/Login.css";

export default function Login() {
  return (
    <section className="main-form-login">
      <form action="submit" method="get" className="form-login-container">
        <ul>
          <li>
            <label htmlFor="username">Username</label>
          </li>
          <li>
            <input
              type="text"
              name="username"
              placeholder="Enter your username."
              required
            />
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor="password">Password</label>
          </li>
          <li>
            <input
              type="text"
              name="password"
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
