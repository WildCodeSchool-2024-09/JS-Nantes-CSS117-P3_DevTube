import "./../../styles/VideoCard.css";
import type { VideoCardProps } from "../../types/videocard";

function VideoCard({
  isFreemium,
  title,
  duration,
  thumbnailUrl,
  isLarge,
  displayCardInfo = true,
}: VideoCardProps) {
  // TODO :favorites gestion with heart empty or orange heart

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
            <img
              className="heart-icon"
              src="/orange-heart.png"
              alt="heart icon"
            />
          </section>
        )}
        {isFreemium === 1 && !isLarge && (
          <div className="background-cadenas">
            <img className="cadenas" src="cadenas-dark.png" alt="cadenas" />
          </div>
        )}
      </article>
    </>
  );
}
export default VideoCard;
