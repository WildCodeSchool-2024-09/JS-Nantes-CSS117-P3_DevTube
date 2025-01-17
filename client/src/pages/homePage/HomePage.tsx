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
  const [videosNewIn, setVideosNewIn] = useState<Video[]>();

  useEffect(() => {
    const urlForVideos = `${import.meta.env.VITE_API_URL}/api/videos`;
    recoverInfoVideos(urlForVideos);
  }, []);

  async function recoverInfoVideos(url: string) {
    if (url) {
      const request = await fetch(url);
      const datas = await request.json();
      setInfoVideos(datas);
      //FILTER BY POPULAR
      const videosPopularData = datas.filter(
        (video: { is_popular: number }) => video.is_popular === 1,
      );
      setVideosPopular(videosPopularData);
      //FILTER BY NEW IN - THE LAST REGISTER
      const videosNewInData = datas.slice(0, 4);
      // console.log({ "video recentes": videosNewInData });
      setVideosNewIn(videosNewInData);
      // console.log({ "video recentes state": videosNewIn });
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
          {videosNewIn && <MiniVideoCarousel videos={videosNewIn} />}
        </section>
      </div>
    )
  );
}
