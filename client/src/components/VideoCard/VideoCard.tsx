import "./../../styles/VideoCard.css";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { OutletContextProps } from "../../types/outletContext";
import type { VideoCardProps } from "../../types/videocard";
import useAuth from "../../utils/useAuth";
import useTheme from "../../utils/useTheme";

function VideoCard({
  isFreemium,
  title,
  duration,
  id,
  thumbnailUrl,
  isLarge,
  displayCardInfo = true,
}: VideoCardProps) {
  // TODO :favorites gestion with heart empty or orange heart

  const { theme } = useTheme();
  const { auth } = useAuth();
  const outletContext = useOutletContext<OutletContextProps>();

  const [isFavIcon, setIsFavIcon] = useState(false);

  const handleClickFav = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const idVideoToFind = event.currentTarget.dataset.idvideo;
    const idUserToFind = event.currentTarget.dataset.iduser;
    const favItem = {
      user_id: idUserToFind,
      video_id: idVideoToFind,
    };

    if (!isFavIcon) {
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

        if (!response.ok) {
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
        if (!response.ok) {
          throw new Error("An unknown error occurred.");
        }
      } catch (err) {
        console.warn(err);
      }
    }
    setIsFavIcon(!isFavIcon);
  };

  return (
    <>
      <article className={`video-card ${isLarge ? "video-card-large" : ""}`}>
        <section className="card-content">
          <div className="video-item">
            <img
              src={thumbnailUrl}
              width={isLarge ? undefined : 300}
              height={isLarge ? undefined : 168}
              alt={title}
              className={`video-thumbnail ${!displayCardInfo ? "with-border-radius" : ""}`}
            />
          </div>
        </section>
        {displayCardInfo && (
          <section className="card-footer">
            <div className="first-row-card-footer">
              <p className="video-title">{title}</p>
              <div className="time-video-wrapper">
                <img className="clock-icon" src="/clock.png" alt="clock" />
                <p className="time">{duration} min</p>
              </div>
            </div>
            {auth && (
              <button
                className="fav-button"
                type="button"
                data-idvideo={id}
                data-iduser={outletContext.userId}
                onClick={(event) => handleClickFav(event)}
              >
                <img
                  className="heart-icon"
                  src={isFavIcon ? "/orange-heart.png" : "/empty-heart.png"}
                  alt="heart icon"
                />
              </button>
            )}
          </section>
        )}
        {!auth && isFreemium === 1 && !isLarge && (
          <div className="background-cadenas">
            <img
              className="cadenas"
              src={
                theme
                  ? "/public/cadenas-light-theme.png"
                  : "/public/cadenas-dark.png"
              }
              alt="cadenas"
            />
          </div>
        )}
      </article>
    </>
  );
}
export default VideoCard;
