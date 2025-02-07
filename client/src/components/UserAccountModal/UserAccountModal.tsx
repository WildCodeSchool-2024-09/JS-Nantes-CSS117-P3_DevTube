import type { User } from "../../../../server/src/modules/user/user";
import "../../styles/UserAccountModal.css";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import useToast from "../../utils/useToastify";

const UserAccountModal = forwardRef<
  HTMLDialogElement,
  { userData: User; onSubmit: (updatedUser: User) => void }
>(({ userData, onSubmit }, ref) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const { notifySuccess, notifyError } = useToast();

  // Allowed the parent for open the dialog tag
  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  useEffect(() => {
    setFormValue(userData);
  }, [userData]);

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const [formValue, setFormValue] = useState<User>(userData);

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
      const data = Object.fromEntries(formData.entries()) as unknown as User;

      data.profil_img = imageProfileURL;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userData.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        notifySuccess("You profile is update.");
      }

      data.id = userData.id;
      console.warn(data.id);

      onSubmit(data);
      closeModal();
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  return (
    <dialog ref={dialogRef} className="user-account-modale-container">
      <button className="close-arrow" type="button" onClick={closeModal}>
        &times;
      </button>
      <form className="form-account-modale-container" onSubmit={handleSubmit}>
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          defaultValue={formValue.firstname || ""}
        />

        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          defaultValue={formValue.lastname || ""}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          defaultValue={formValue.email || ""}
        />

        <label htmlFor="github_url">GitHub URL</label>
        <input
          type="text"
          name="github_url"
          id="github_url"
          defaultValue={formValue.github_url || ""}
        />

        <label htmlFor="linkedin_url">Linkedin URL</label>
        <input
          type="text"
          name="linkedin_url"
          id="linkedin_url"
          defaultValue={formValue.linkedin_url || ""}
        />

        <label htmlFor="profil-image">Profile image</label>
        <section
          className="profil-image-wrapper"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onChange={handleFileChange}
        >
          <img
            id="profil-image"
            aria-labelledby="linkedin_url"
            src={`${imgSrc || `${import.meta.env.VITE_API_URL}/${userData?.profil_img}`}`}
            alt="User's photo."
          />
        </section>

        <button type="submit" className="standard-button">
          Apply
        </button>
      </form>
    </dialog>
  );
});

export default UserAccountModal;
