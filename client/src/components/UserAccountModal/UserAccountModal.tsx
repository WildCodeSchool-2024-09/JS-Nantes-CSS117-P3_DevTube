import "../../styles/UserAccountModal.css";
import { forwardRef, useImperativeHandle, useRef } from "react";

const UserAccountModal = forwardRef<
  HTMLDialogElement,
  React.HTMLProps<HTMLDialogElement>
>((props, ref) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

  const closeModal = () => {
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      {...props}
      className="user-account-modale-container"
    >
      <button type="button" onClick={closeModal}>
        &times;
      </button>
      <form className="form-account-modale-container">
        <label htmlFor="firstname">Firstname</label>
        <input type="text" name="firstname" id="firstname" />

        <label htmlFor="lastname">Lastname</label>
        <input type="text" name="lastname" id="lastname" />

        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />

        <label htmlFor="github_url-url">GitHub URL</label>
        <input type="text" name="github_url-url" id="github_url-url" />

        <label htmlFor="linkedin_url">Linkedin URL</label>
        <input type="text" name="linkedin_url" id="linkedin_url" />

        <button type="submit" className="standard-button">
          Update
        </button>
      </form>
    </dialog>
  );
});

export default UserAccountModal;
