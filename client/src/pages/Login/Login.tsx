import "../../styles/Login.css";
import { useSetFocus } from "../../utils/useSetFocus";

export default function Login() {
  const focusInUsername = useSetFocus<HTMLInputElement>();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="main-form-login">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label id="username" htmlFor="username">
          User name
        </label>
        <input
          type="text"
          ref={focusInUsername}
          name="username"
          aria-labelledby="username"
          placeholder="Enter your user name."
          required
        />

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

        <button type="submit" className="little-cta">
          Sign up
        </button>
      </form>
    </section>
  );
}
