import { useTranslation } from "react-i18next";
import "../../styles/videoPlayer.css";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import MiniVideoCarousel from "../../components/Carousels/MiniVideoCarousel";
import { AuthContext } from "../../contexts/AuhtProvider";
import type { OutletContextProps } from "../../types/outletContext";
import type { Video } from "../../types/video";
import useToast from "../../utils/useToastify";

export default function VideoPlayer() {
  const { id, thumbnail, description, category_id, name, error } =
    useLoaderData() as Partial<Video> & {
      error?: number;
    }; // Partial because it's probably a video but it could be an error, so we add a new type at type Video (the error object)
  // and we add the key error in the object decomposition
  const { t } = useTranslation();
  const { notifySuccess } = useToast();
  const [videos, setVideos] = useState<Video[]>();
  const { user } = useContext(AuthContext) ?? {};
  const outletContext = useOutletContext<OutletContextProps>();

  const isVideoInUserFavorites =
    user &&
    outletContext.favUserList?.some((fav) => {
      return fav.video_id === Number(id);
    });

  useEffect(() => {
    if (category_id) {
      const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${category_id}`;
      recoverInfoVideos(urlForVideos);
    }
  }, [category_id]); // We fetch only if we have a category_id so if we have received a video and not an error

  const handleClickFav = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const idVideoToFind = event.currentTarget.dataset.idvideo;
    const idUserToFind = event.currentTarget.dataset.iduser;
    const favItem = {
      user_id: Number(idUserToFind),
      video_id: Number(idVideoToFind),
    };

    if (!isVideoInUserFavorites) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorites-user/favorite`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(favItem),
          },
        );
        if (response.ok) {
          notifySuccess(`This video ${name} has been added in your favorite`);
          outletContext.setNeedToRefetchFavList(true);
        } else {
          throw new Error("An unknown error occurred.");
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorites-user/favorite`,
          {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(favItem),
          },
        );
        if (response.ok) {
          notifySuccess(`This video ${name} has been deleted in your favorite`);
          outletContext.setNeedToRefetchFavList(true);
        } else {
          throw new Error("An unknown error occurred.");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  async function recoverInfoVideos(url: string) {
    const token = localStorage.getItem("token");

    const request = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const datas = await request.json();
    const datasFiltered = datas.filter(
      (data: { id: string }) => data.id !== id,
    );
    setVideos(datasFiltered);
  }

  return (
    <div className="video-player-page">
      {/* We always return the page style */}
      {/* But the rest of the return is condistionnel between an error received or a video received */}
      {/* IF ERROR 403 RECEIVED, RETURN =>  */}
      {error && error === 403 && (
        <div>
          <h1>Error 403 - you do not have access to this content</h1>
        </div>
      )}

      {error && error !== 403 && (
        <div>
          <h1>Error {error} - there was a problem accessing this content</h1>
        </div>
      )}
      {/* IF ONE VIDEO RECEIVED, RETURN =>  */}
      {id && (
        <>
          <h1>{name}</h1>
          <section className="current-video">
            <article className="description-video">
              <h2>{t("description-title")}</h2>
              <p>{description}</p>
            </article>
            <video key={thumbnail} controls muted poster="">
              <source
                src={`${import.meta.env.VITE_API_URL}${thumbnail}`}
                type="video/mp4"
              />
            </video>
          </section>
          <section className="buttons-video-container">
            {user && (
              <button
                type="button"
                className="big-cta"
                data-idvideo={id}
                data-iduser={user?.id}
                onClick={handleClickFav}
              >
                {isVideoInUserFavorites
                  ? "Delete from favorites"
                  : "Add in favorites"}
              </button>
            )}
          </section>
          <section className="category-video">
            <h2>{t("category-title")}</h2>
            <article>{videos && <MiniVideoCarousel videos={videos} />}</article>
          </section>
        </>
      )}
    </div>
  );
}
