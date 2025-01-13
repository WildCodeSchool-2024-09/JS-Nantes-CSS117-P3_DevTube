import { useTranslation } from "react-i18next";
import "../../styles/videoPlayer.css";
import { useLoaderData } from "react-router-dom";
import type { Video } from "../../types/video";
// import VideoCard from "../../components/VideoCard/VideoCard";

export default function VideoPlayer() {
  // TODO : variable for h1 (title of the video launched)
  const { t } = useTranslation();
  const {
    id,
    thumbnail,
    // name,
    // duration,
    //
    // description,
    // category_id,
    // is_freemium,
    // added_date,
    // is_heroSlide,
    // is_popular,
  } = useLoaderData() as Video;
  // console.log({ props: Object.keys(data) });
  //1. fetcher l'api sur le endpoint video id
  //2. utiliser les data de la video
  //Soit fetch useEffect, soit loader

  return id ? (
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
      <video controls muted width="1024" poster="">
        <source src={`http://localhost:3310${thumbnail}`} type="video/mp4" />
      </video>
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
  ) : null; // si je n'ai pas d'id je retourne null -> en faisant ça on s'assure que la data soit bien chargée avant de retourner le composant
}
