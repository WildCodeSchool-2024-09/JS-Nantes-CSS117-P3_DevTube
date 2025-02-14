import "./../../styles/VideoCard.css";
import { useState } from "react";
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
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(false);

  const handleClickFav = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setIsFav(!isFav);
    console.warn({ event });
    // const idVideoToFind = event.currentTarget.dataset.idVideo;
    // try {
    //   const token = localStorage.getItem("token");
    //   const response = await fetch(
    //     `${import.meta.env.VITE_API_URL}/api/videos/${outletContext.videoToUpdate?.id}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     },
    //   );

    //   if (!response.ok) {
    //     throw new Error("An unknown error occurred.");
    //   }
    //   notifySuccess(
    //     `The video ${outletContext.videoToUpdate?.name} has been removed.`,
    //   );
    //   outletContext.setVideosSectionOpen(!outletContext.isVideosSectionOpen);
    //   outletContext.setInfoVideoOpen(!outletContext.isInfoVideoOpen);
    //   outletContext.setNeedToRefetch(() => !outletContext.needToRefetch);
    // } catch (err) {
    //   notifyError((err as Error).message);
    // }
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
                data-idVideo={id}
                data-idUser={user?.id}
                onClick={(event) => handleClickFav(event)}
              >
                <img
                  className="heart-icon"
                  src={isFav ? "/orange-heart.png" : "/empty-heart.png"}
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
