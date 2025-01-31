// import "../../styles/Subscribe.css";
import { useRef } from "react";
import UserAccountModal from "../../components/UserAccountModal/UserAccountModal";

export default function Subscribe() {
  const refModal = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    refModal.current?.showModal();
  };

  return (
    <section className="section-my-account-container">
      <section className="">
        <h1>My account</h1>

        <label htmlFor="firstname">First name</label>
        <input type="text" name="firstname" id="firstname" value={"Fabrice"} />

        <label htmlFor="lastname">Last name</label>
        <input type="text" name="lastname" id="lastname" value={"Atlan"} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={"email@gmail.com"} />

        <label htmlFor="github_url">GitHub URL</label>
        <input
          type="text"
          name="github_url"
          id="github_url"
          value={"github@gmail.com"}
        />

        <label htmlFor="linkedin_url">Linkedin URL</label>
        <input
          type="text"
          name="linkedin_url"
          id="linkedin_url"
          value={"linkedin@gmail.com"}
        />

        <label htmlFor="profil-image">Profile image</label>

        <img
          id="profil-image"
          aria-labelledby="linkedin_url"
          src={`${import.meta.env.VITE_API_URL}/assets/images/userprofil/fabrice-atlan.png`}
          alt="User's photo."
        />

        <button type="button" className="standard-button" onClick={openModal}>
          Open modal
        </button>
      </section>
      <UserAccountModal ref={refModal} />
    </section>
  );
}
