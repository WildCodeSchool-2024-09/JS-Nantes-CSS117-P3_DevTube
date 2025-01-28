import { useEffect, useRef, useState } from "react";
import "../../styles/Subscribe.css";
import useToast from "../../utils/useToastify";

//import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Subscribe() {
  const { notifySuccess, notifyError } = useToast();

  // Reset all fields of the form
  const resetAllFields = () => {
    formRef.current?.reset();
    setFile(null);
    setImageSrc("");
  };

  // Set the focus on firstname input
  const getFocus = useRef<HTMLInputElement | null>(null);

  // Get the form data
  const formRef = useRef<HTMLFormElement | null>(null);

  const [file, setFile] = useState<File | null>(null);

  // useState for drag the selected image
  const [imgSrc, setImageSrc] = useState<string>();

  useEffect(() => {
    getFocus.current?.focus();
  }, []);

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

    try {
      const formDataImage = new FormData();

      if (file) {
        formDataImage.append("profile-image", file);
      }

      const responseImage = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/file`,
        {
          method: "POST",
          body: formDataImage,
        },
      );

      const { imageProfileURL } = await responseImage.json();

      const formData = new FormData(e.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      data.profil_img = imageProfileURL && "";

      if (data.confirm_password !== data.password) {
        throw new Error("Passwords doesn't identical.");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        resetAllFields();
        notifySuccess(`Welcome in devTube ${data.firstname}`);
      }
    } catch (error) {
      notifyError((error as Error).message);
    }
  };

  return (
    <section className="form-subscribe-container">
      <h1>Subscribe</h1>

      <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="firstname">
          First name <span className="mandatory-data">*</span>
        </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          ref={getFocus}
          aria-labelledby="firstname"
          placeholder="Enter your first name."
          required
        />

        <label htmlFor="lastname">
          Last name <span className="mandatory-data">*</span>
        </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          aria-labelledby="lastname"
          placeholder="Enter your last name."
          required
        />

        <label htmlFor="email">
          Email <span className="mandatory-data">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          aria-labelledby="email"
          placeholder="Enter your email."
          required
        />

        <label htmlFor="password">
          Password <span className="mandatory-data">*</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          aria-labelledby="password"
          placeholder="Enter your password."
          required
        />

        <label htmlFor="confirm_password">
          Confirm your password <span className="mandatory-data">*</span>
        </label>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          aria-labelledby="confirm_password"
          placeholder="Confirm your password."
          required
        />

        <label htmlFor="github_url">GitHub URL</label>
        <input
          type="text"
          name="github_url"
          id="github_url"
          aria-labelledby="github_url"
          placeholder="Enter your GitHub."
        />

        <label htmlFor="linkedin_url">Linkedin URL</label>
        <input
          type="text"
          name="linkedin_url"
          id="linkedin_url"
          aria-labelledby="linkedin_url"
          placeholder="Enter your Linkedin URL."
        />

        <section
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onChange={handleFileChange}
        >
          <label htmlFor="profil-image">
            Profile image <span className="mandatory-data">*</span>
          </label>

          <section className="image-container">
            {imgSrc ? (
              <img
                id="profil-image"
                aria-labelledby="linkedin_url"
                src={imgSrc}
                alt="User's photo."
              />
            ) : (
              <p id="profil-image" aria-labelledby="linkedin_url">
                Drag a thumbnail for your video here
              </p>
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
