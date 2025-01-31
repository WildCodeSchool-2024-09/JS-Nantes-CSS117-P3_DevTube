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
      <form>
        <label htmlFor="firstname">Firstname</label>
        <input type="text" name="firstname" id="firstname" />
        <button type="submit" className="standard-button">
          Update
        </button>
      </form>
    </dialog>
  );
});

export default UserAccountModal;
