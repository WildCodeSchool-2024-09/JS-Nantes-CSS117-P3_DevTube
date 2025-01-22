import { useEffect, useRef } from "react";
import "../../styles/Login.css";

export default function Login() {
  const getFocus = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getFocus.current?.focus();
  }, []);

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
          ref={getFocus}
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
