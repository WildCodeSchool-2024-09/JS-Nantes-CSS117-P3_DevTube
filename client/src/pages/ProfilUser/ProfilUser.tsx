import "../../styles/ProfilUser.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import type { User } from "../../../../server/src/modules/user/user";
import MiniVideoCarousel from "../../components/Carousels/MiniVideoCarousel";
import UserAccountModal from "../../components/UserAccountModal/UserAccountModal";
import { AuthContext } from "../../contexts/AuhtProvider";
import type { OutletContextProps } from "../../types/outletContext";
import type { Video } from "../../types/video";

export default function ProfilUser() {
  const { user } = useContext(AuthContext) ?? {};
  const [userData, setUserData] = useState<User>(user as User);
  const { t } = useTranslation();

  const outletContext = useOutletContext<OutletContextProps>();
  const [videosFavData, setVideosFavData] = useState<Video[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${user?.id}`,
        );
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const urlForFindFavVideosData = `${import.meta.env.VITE_API_URL}/api/video-favorites/${user.id}`;
      recoverVideosDataFavOfUser(urlForFindFavVideosData);
    }
  }, [user]);

  async function recoverVideosDataFavOfUser(url: string) {
    const token = localStorage.getItem("token");
    try {
      const request = await fetch(url, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await request.json();
      setVideosFavData(data);
    } catch (err) {
      console.error(err);
    }
  }

  const refModal = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    refModal.current?.showModal();
  };

  const HandleUpdateUser = (updateUser: User) => {
    setUserData(updateUser);
  };
  return userData ? (
    <>
      <section className="section-my-account-container">
        <section>
          <h1>{`${t("title-myAccount")}`}</h1>

          <label htmlFor="firstname">{`${t("firstname-myAccount")}`}</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            key={userData?.firstname}
            defaultValue={userData?.firstname}
            readOnly
          />

          <label htmlFor="lastname">{`${t("lastname-myAccount")}`}</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            key={userData?.lastname}
            defaultValue={userData?.lastname}
            readOnly
          />

          <label htmlFor="email">{`${t("email-myAccount")}`}</label>
          <input
            type="email"
            name="email"
            id="email"
            key={userData?.email}
            defaultValue={userData?.email}
            readOnly
          />

          <label htmlFor="github_url">{`${t("gitHub-myAccount")}`}</label>
          <input
            type="text"
            name="github_url"
            id="github_url"
            key={userData?.github_url}
            defaultValue={userData?.github_url}
            readOnly
          />

          <label htmlFor="linkedin_url">{`${t("linkeDin-myAccount")}`}</label>
          <input
            type="text"
            name="linkedin_url"
            id="linkedin_url"
            key={userData?.linkedin_url}
            defaultValue={userData?.linkedin_url}
            readOnly
          />

          <label htmlFor="profil-image">{`${t("profilImage-myAccount")}`}</label>
          <section className="profil-image-wrapper">
            <img
              id="profil-image"
              aria-labelledby="linkedin_url"
              key={userData.profil_img}
              alt="User's photo."
              src={`${userData?.profil_img ? `${import.meta.env.VITE_API_URL}/${userData?.profil_img}` : `${import.meta.env.VITE_API_URL}/assets/images/userprofil/avatar/user_profile.png`}`}
            />
          </section>

          <button type="button" className="standard-button" onClick={openModal}>
            {`${t("update-myAccount")}`}
          </button>
        </section>

        <UserAccountModal
          ref={refModal}
          userData={userData}
          onSubmit={HandleUpdateUser}
        />
      </section>
      {user && outletContext.favUserList && (
        <section>
          <h2>Your favorites</h2>
          {videosFavData && <MiniVideoCarousel videos={videosFavData} />}
        </section>
      )}
    </>
  ) : (
    <p>Loading...</p>
  );
}
