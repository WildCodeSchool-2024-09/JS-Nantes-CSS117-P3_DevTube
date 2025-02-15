import "./../../styles/VideoCard.css";
import { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "../../contexts/AuhtProvider";
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
  const { user } = useContext(AuthContext) ?? {};
  const outletContext = useOutletContext<OutletContextProps>();
  const isVideoInUserFavorites =
    user &&
    outletContext.favUserList?.some((fav) => {
      return fav.video_id === Number(id);
    });

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
            {user && (
              <button className="fav-button" type="button">
                <img
                  className="heart-icon"
                  src={
                    isVideoInUserFavorites
                      ? "/orange-heart.png"
                      : "/empty-heart.png"
                  }
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
