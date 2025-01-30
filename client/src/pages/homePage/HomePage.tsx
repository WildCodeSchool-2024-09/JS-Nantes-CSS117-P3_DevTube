import { useTranslation } from "react-i18next";
import HeroSlider from "../../components/Carousels/HeroSlider";
import MiniVideoCarousel from "../../components/Carousels/MiniVideoCarousel";
import "../../styles/HomePage.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { OutletContextProps } from "../../types/outletContext";
import type { Video } from "../../types/video";
import useToast from "../../utils/useToastify";

export default function () {
  const { t } = useTranslation();
  const outletContext = useOutletContext<OutletContextProps>();
  const [videoHeroSlider, setvideoHeroSlider] = useState<Video[]>();
  const [videosPopular, setVideosPopular] = useState<Video[]>();
  const [videosNewIn, setVideosNewIn] = useState<Video[]>();
  const { notifyError } = useToast();

  useEffect(() => {
    const urlForVideos = `${import.meta.env.VITE_API_URL}/api/videos`;
    recoverInfoVideos(urlForVideos);
  }, []);

  async function recoverInfoVideos(url: string) {
    const token = localStorage.getItem("token");

    try {
      const request = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const datas = await request.json();
      outletContext.setInfoVideos(datas);
      const videoHeroSliderData = datas.filter(
        (video: Video) => video.is_heroSlide === 1,
      );
      //FILTER FOR HEROSLIDER
      setvideoHeroSlider(videoHeroSliderData);
      //FILTER BY POPULAR
      const videoPopularData = datas.filter(
        (video: Video) => video.is_popular === 1,
      );
      setVideosPopular(videoPopularData);
      //FILTER BY NEW IN - THE LAST REGISTER
      const videosNewInData = datas.slice(0, 9);
      setVideosNewIn(videosNewInData);
    } catch (err) {
      notifyError("Sorry, something is wrong !");
    }
  }

  return (
    outletContext.infoVideos?.length && (
      <div className="home-page">
        <section>
          <h1 className="home-page-title">{t("title-homePage")}</h1>
          {videoHeroSlider && <HeroSlider videos={videoHeroSlider} />}
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
