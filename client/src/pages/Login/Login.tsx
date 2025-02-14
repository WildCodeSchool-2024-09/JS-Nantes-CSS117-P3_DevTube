import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuhtProvider";
import { useSetFocus } from "../../utils/useSetFocus";
import useToast from "../../utils/useToastify";

export default function Login() {
  const focusInUsername = useSetFocus<HTMLInputElement>();
  const { notifySuccess, notifyError } = useToast();
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("Invalid auth !");
  }
  const { login } = authContext;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      // Ask for a token when I log in
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("You are not logged");
      }

      const { token, user } = await response.json();

      if (token) {
        notifySuccess("You are logged !");
        login(token, user);
        navigate("/");
      }
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  return (
    <section className="main-form-login">
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <label id="email" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          ref={focusInUsername}
          name="email"
          aria-labelledby="email"
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
