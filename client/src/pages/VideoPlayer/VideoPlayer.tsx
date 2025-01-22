import { useTranslation } from "react-i18next";
import "../../styles/videoPlayer.css";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import type { Video } from "../../types/video";

export default function VideoPlayer() {
  const { t } = useTranslation();
  const [videos, setVideos] = useState<Video[]>();
  const { id, thumbnail, description, category_id, name } =
    useLoaderData() as Video;

  useEffect(() => {
    const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${category_id}`;
    recoverInfoVideos(urlForVideos);
  }, [category_id]);
  // TODO : DON'T DISPLAY THE CUTTENT VIDEO OF THE PLAYER IN THE VIDEOS OF THE SAME CATEGORY

  async function recoverInfoVideos(url: string) {
    const request = await fetch(url);
    const datas = await request.json();
    setVideos(datas);
  }

  return id ? (
    <div className="video-player-page">
      <h1>{name}</h1>
      <section className="current-video">
        <article className="description-video">
          <h2>{t("description-title")}</h2>
          <p>{description}</p>
        </article>
        <video key={thumbnail} controls muted poster="">
          {/* key tells react when to rerender an element, video needs it so react compares with the previous key */}
          <source src={`http://localhost:3310${thumbnail}`} type="video/mp4" />
        </video>
      </section>
      <section className="category-video">
        <h2>{t("category-title")}</h2>
        <article>
          {videos?.map((video) => (
            <Link
              to={`/video/${video.id}`}
              key={video.id}
              className="carousel-slide"
            >
              <VideoCard
                key={video.id}
                title={video.name}
                thumbnailUrl={`${import.meta.env.VITE_API_URL}/assets/images/videoPreviewImages/apercu-ex.png`}
              />
            </Link>
          ))}
        </article>
      </section>
    </div>
  ) : null; // si je n'ai pas d'id je retourne null -> en faisant ça on s'assure que la data soit bien chargée avant de retourner le composant
}
