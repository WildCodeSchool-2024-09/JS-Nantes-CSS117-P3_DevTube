import "./../../styles/VideoCard.css";
import type { VideoCardProps } from "../../types/videocard";

function VideoCard({
  title,
  thumbnailUrl,
  isLarge,
  displayCardInfo = true,
}: VideoCardProps) {
  // TODO : variable for time video + favorites gestion with heart empty or orange heart
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
        {displayCardInfo ? (
          <section className="card-footer">
            <div className="first-row-card-footer">
              <p>{title}</p>
              <div className="time-video-wrapper">
                <img className="clock-icon" src="/clock.png" alt="clock" />
                <p className="time">60 min</p>
              </div>
            </div>
            <img
              className="heart-icon"
              src="/orange-heart.png"
              alt="heart icon"
            />
          </section>
        ) : null}
      </article>
    </>
  );
}
export default VideoCard;
