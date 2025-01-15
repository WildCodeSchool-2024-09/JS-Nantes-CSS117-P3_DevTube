import { useTranslation } from "react-i18next";
import "../../styles/videoPlayer.css";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import type { Video } from "../../types/video";
// import VideoCard from "../../components/VideoCard/VideoCard";

export default function VideoPlayer() {
  const { t } = useTranslation();
  const [videos, setVideos] = useState<Video[]>();
  const { id, thumbnail, description, category_id } = useLoaderData() as Video;

  useEffect(() => {
    const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${category_id}`;
    recoverInfoVideos(urlForVideos);
  }, [category_id]);
  // TODO : DON'T DISPLAY THE CUTTENT VIDEO OF THE PLAYER IN THE VIDEOS OF THE SAME CATEGORY

  async function recoverInfoVideos(url: string) {
    if (url) {
      try {
        const request = await fetch(url);
        const datas = await request.json();
        setVideos(datas);
      } catch (error) {
        alert("Sorry, we met a problem. Please, come back later.");
      }
    }
  }

  return id ? (
    <>
      <h1 className="title-video-player-page">Video Title</h1>
      <div>PLAYER</div>
      <section className="description-video">
        <h2>{t("description-title")}</h2>
        <p className="text-description-video">{description}</p>
      </section>
      <video controls muted width="1024" poster="">
        <source src={`http://localhost:3310${thumbnail}`} type="video/mp4" />
      </video>
      <section className="category-video">
        <h2>{t("category-title")}</h2>
        <article className="card-video-container">
          {videos?.map((video) => (
            <a
              href={`/video/${video.id}`}
              key={video.id}
              className="carousel-slide"
            >
              <VideoCard
                key={video.id}
                title={video.name}
                thumbnailUrl={`${import.meta.env.VITE_API_URL}/assets/images/videoPreviewImages/apercu-ex.png`}
              />
            </a>
          ))}
        </article>
      </section>
    </>
  ) : null; // si je n'ai pas d'id je retourne null -> en faisant ça on s'assure que la data soit bien chargée avant de retourner le composant
}
