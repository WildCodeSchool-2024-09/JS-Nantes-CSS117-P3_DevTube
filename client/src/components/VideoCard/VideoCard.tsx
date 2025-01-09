import clock from "/clock.png";
import orangeHeart from "/orange-heart.png";
import "./../styles/VideoCard.css";

function VideoCard() {
  // TODO : variable for time video + favorites gestion with heart empty or orange heart
  return (
    <>
      <article className="video-card">
        <section className="card-content">Video</section>
        <section className="card-footer">
          <div className="first-row-card-footer">
            <p>Title video</p>
            <div className="time-video-wrapper">
              <img className="clock-icon" src={clock} alt="clock" />
              <p className="time">60 min</p>
            </div>
          </div>
          <img className="heart-icon" src={orangeHeart} alt="heart icon" />
        </section>
      </article>
    </>
  );
}
export default VideoCard;
