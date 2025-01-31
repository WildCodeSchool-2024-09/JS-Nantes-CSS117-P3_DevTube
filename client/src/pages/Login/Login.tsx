import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import { useSetFocus } from "../../utils/useSetFocus";
import useToast from "../../utils/useToastify";

export default function Login() {
  const focusInUsername = useSetFocus<HTMLInputElement>();
  const { notifySuccess, notifyError } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
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

      const { token } = await response.json();

      if (token) {
        notifySuccess("You are logged !");

        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (err) {
      notifyError("You are log out !");
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
