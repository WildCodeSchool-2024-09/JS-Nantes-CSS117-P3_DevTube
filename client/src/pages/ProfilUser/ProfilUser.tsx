import "../../styles/ProfilUser.css";
import { useContext, useRef } from "react";
import UserAccountModal from "../../components/UserAccountModal/UserAccountModal";
import { AuthContext } from "../../contexts/AuhtProvider";

export default function Subscribe() {
  const refModal = useRef<HTMLDialogElement>(null);

  const { user } = useContext(AuthContext) ?? {};

  const openModal = () => {
    refModal.current?.showModal();
  };

  return (
    <section className="section-my-account-container">
      <section>
        <h1>My account</h1>

        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          value={user?.firstname}
        />

        <label htmlFor="lastname">Last name</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={user?.lastname}
        />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" value={user?.email} />

        <label htmlFor="github_url">GitHub URL</label>
        <input
          type="text"
          name="github_url"
          id="github_url"
          value={user?.github_url}
        />

        <label htmlFor="linkedin_url">Linkedin URL</label>
        <input
          type="text"
          name="linkedin_url"
          id="linkedin_url"
          value={user?.linkedin_url}
        />

        <label htmlFor="profil-image">Profile image</label>
        <section className="profil-image-wrapper">
          <img
            id="profil-image"
            aria-labelledby="linkedin_url"
            src={`${import.meta.env.VITE_API_URL}/${user?.profil_img}`}
            alt="User's photo."
          />
        </section>

        <button type="button" className="standard-button" onClick={openModal}>
          Open modal
        </button>
      </section>
      <UserAccountModal ref={refModal} />
    </section>
  );
}
