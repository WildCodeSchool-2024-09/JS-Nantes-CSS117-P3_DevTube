import { useRef } from "react";
import "../../styles/Subscribe.css";

export default function Subscribe() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        formRef.current?.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="main-form-subscribe">
      <form
        className="form-subscribe-container"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <section className="form-subscribe-label">
          <label id="firstname" htmlFor="firstname">
            First name
          </label>
          <input
            type="text"
            name="firstname"
            aria-labelledby="firstname"
            placeholder="Enter your first name."
            required
          />
        </section>

        <section className="form-subscribe-label">
          <label id="lastname" htmlFor="lastname">
            Last name
          </label>
          <input
            type="text"
            name="lastname"
            aria-labelledby="lastname"
            placeholder="Enter your last name."
            required
          />
        </section>

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

        <section className="form-subscribe-label">
          <label id="confirm_password" htmlFor="confirm_password">
            Confirm your password
          </label>
          <input
            type="password"
            name="confirm_password"
            aria-labelledby="confirm_password"
            placeholder="Confirm your password."
            required
          />
        </section>

        <section className="form-subscribe-label">
          <label id="github_url" htmlFor="github_url">
            GitHub URL
          </label>
          <input
            type="text"
            name="github_url"
            aria-labelledby="github_url"
            placeholder="Enter your GitHub."
          />
        </section>

        <section className="form-subscribe-label">
          <label id="linkedin_url" htmlFor="linkedin_url">
            Linkedin URL
          </label>
          <input
            type="text"
            name="linkedin_url"
            aria-labelledby="linkedin_url"
            placeholder="Enter your Linkedin URL."
          />
        </section>

        <section className="form-subscribe-label">
          <label id="profil-image" htmlFor="profil-image">
            Profil image
          </label>
          <input
            type="image"
            name="profil_img"
            aria-labelledby="profil-image"
            placeholder="Drag the user's profil image."
            required
          />
        </section>

        <button type="submit" className="little-cta">
          Sign up
        </button>
      </form>
    </section>
  );
}
