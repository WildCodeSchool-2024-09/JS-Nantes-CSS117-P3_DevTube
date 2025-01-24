import { useTranslation } from "react-i18next";
import "../../styles/videoPlayer.css";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import type { Video } from "../../types/video";

export default function VideoPlayer() {
  const { t } = useTranslation();
  const [videos, setVideos] = useState<Video[]>();
  const { id, thumbnail, description, category_id, name, error } =
    useLoaderData() as Partial<Video> & {
      error?: number;
    }; // Partal because it's probably a video but it could be an error, so we add a new type at type Video (the error object)
  // and we add the key error in the object decomposition

  useEffect(() => {
    if (category_id) {
      const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${category_id}`;
      recoverInfoVideos(urlForVideos);
    }
  }, [category_id]); // We fetch only if we have a category_id so if we have received a video and not an error

  async function recoverInfoVideos(url: string) {
    const request = await fetch(url);
    const datas = await request.json();
    const datasFiltered = datas.filter(
      (data: { id: string }) => data.id !== id,
    );
    setVideos(datasFiltered);
  }

  return (
    <div className="video-player-page">
      {/* We always return the page style */}
      {/* But the rest of the return is condistionnel between an error received or a video received */}
      {/* IF ERROR 403 RECEIVED, RETURN =>  */}
      {error && error === 403 && (
        <div>
          <h1>Error 403 - you do not have access to this content</h1>
        </div>
      )}
      {/* IF ONE VIDEO RECEIVED, RETURN =>  */}
      {id && (
        <>
          <h1>{name}</h1>
          <section className="current-video">
            <article className="description-video">
              <h2>{t("description-title")}</h2>
              <p>{description}</p>
            </article>
            <video key={thumbnail} controls muted poster="">
              <source
                src={`${import.meta.env.VITE_API_URL}${thumbnail}`}
                type="video/mp4"
              />
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
        </>
      )}
    </div>
  );
}
