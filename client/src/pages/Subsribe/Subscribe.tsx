import { useState } from "react";
import "../../styles/Subscribe.css";

export default function Subscribe() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
    github_url: "",
    linkedin_url: "",
    profil_img: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Resetting fields
        setData({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirm_password: "",
          github_url: "",
          linkedin_url: "",
          profil_img: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="main-form-subscribe">
      <form className="form-subscribe-container" onSubmit={handleSubmit}>
        <section className="form-subscribe-label">
          <label id="firstname" htmlFor="firstname">
            First name
          </label>
          <input
            type="text"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
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
            value={data.lastname}
            onChange={handleChange}
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
            value={data.email}
            onChange={handleChange}
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
            value={data.password}
            onChange={handleChange}
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
            value={data.confirm_password}
            onChange={handleChange}
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
            value={data.github_url}
            onChange={handleChange}
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
            value={data.linkedin_url}
            onChange={handleChange}
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
            value={data.profil_img}
            onChange={handleChange}
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
