import { useTranslation } from "react-i18next";
import HeroSlider from "../../components/Carousels/HeroSlider";
import MiniVideoCarousel from "../../components/Carousels/MiniVideoCarousel";
import "../../styles/HomePage.css";
import { useEffect, useState } from "react";
import type { Video } from "../../types/video";

export default function () {
  const { t } = useTranslation();
  const [infoVideos, setInfoVideos] = useState<Video[]>();
  const [videosPopular, setVideosPopular] = useState<Video[]>();

  useEffect(() => {
    const urlForVideos = `${import.meta.env.VITE_API_URL}/api/videos`;
    recoverInfoVideos(urlForVideos);
  }, []);

  async function recoverInfoVideos(url: string) {
    if (url) {
      try {
        const request = await fetch(url);
        const datas = await request.json();
        setInfoVideos(datas); //currentState au cas ou on oublie de passer une valeur ou si la donnee est caduque, il y aura toujours l,ancienne valeur qui s'affichera
        const videoPopularData = datas.filter(
          (video: { is_popular: number }) => video.is_popular === 1,
        );
        setVideosPopular(videoPopularData);
      } catch (error) {
        alert("Sorry, we met a problem. Please, come back later.");
      }
    }
  }

  return (
    infoVideos?.length && (
      <div className="home-page">
        <section>
          <h1 className="home-page-title">{t("title-homePage")}</h1>
          <HeroSlider videos={infoVideos} />
        </section>
        <section>
          <h2 className="home-page-subtitle">{t("subtitle-popular")}</h2>
          {videosPopular && <MiniVideoCarousel videos={videosPopular} />}
        </section>
        <section>
          <h2 className="home-page-subtitle">{t("subtitle-newIn")}</h2>
          <MiniVideoCarousel videos={infoVideos} />
        </section>
      </div>
    )
  );
}
