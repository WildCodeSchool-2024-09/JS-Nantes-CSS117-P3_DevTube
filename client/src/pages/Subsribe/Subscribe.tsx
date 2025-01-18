import { useRef, useState } from "react";
import "../../styles/Subscribe.css";

export default function Subscribe() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  // useState for drag the selected image
  const [imgSrc, setImageSrc] = useState<string>();

  const handleDragOver = (e: React.DragEvent<HTMLScriptElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLScriptElement>) => {
    e.preventDefault();
    const newImage = e.dataTransfer.files[0];
    if (newImage.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(newImage);
      setFile(newImage);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files ? e.target.files[0] : null;
    setFile(currentFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataImage = new FormData();

    if (file) formDataImage.append("profile-image", file);

    try {
      const responseImage = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/file`,
        {
          method: "POST",
          body: formDataImage,
        },
      );

      if (!responseImage.ok) {
        throw new Error("Upload error !");
      }

      const { imageProfileURL } = await responseImage.json();

      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      data.profil_img = imageProfileURL;

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
        setFile(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="form-subscribe-container">
      <h1>Subscribe</h1>

      <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
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

        <label id="github_url" htmlFor="github_url">
          GitHub URL
        </label>
        <input
          type="text"
          name="github_url"
          aria-labelledby="github_url"
          placeholder="Enter your GitHub."
        />

        <label id="linkedin_url" htmlFor="linkedin_url">
          Linkedin URL
        </label>
        <input
          type="text"
          name="linkedin_url"
          aria-labelledby="linkedin_url"
          placeholder="Enter your Linkedin URL."
        />

        <section
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onChange={handleFileChange}
        >
          <label htmlFor="profil-image" id="profil-image">
            Profile image
          </label>

          <section className="image-container">
            {imgSrc ? (
              <img src={imgSrc} alt="User's photo." />
            ) : (
              <p>Drag a thumbnail for your video here</p>
            )}
          </section>
        </section>

        <button type="submit" className="little-cta">
          Sign up
        </button>
      </form>
    </section>
  );
}
