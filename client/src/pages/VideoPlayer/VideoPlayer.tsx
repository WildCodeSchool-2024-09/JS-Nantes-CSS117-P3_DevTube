import { useTranslation } from "react-i18next";
import "../style/videoPlayer.css";
import VideoCard from "../../components/VideoCard/VideoCard";

export default function VideoPlayer() {
  // TODO : variable for h1 (title of the video launched)
  const { t } = useTranslation();
  return (
    <>
      <h1 className="title-video-player-page">Video Title</h1>
      <div>PLAYER</div>
      <section className="description-video">
        <h2>{t("description-title")}</h2>
        <p className="text-description-video">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </section>
      {/* <video src=""></video> */}
      <section className="category-video">
        <h2>{t("category-title")}</h2>
        <div className="card-video-container">
          {/* <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard /> */}
        </div>
      </section>
    </>
  );
}
