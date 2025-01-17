import { useTranslation } from "react-i18next";
import HeroSlider from "../../components/Carousels/HeroSlider";
import MiniVideoCarousel from "../../components/Carousels/MiniVideoCarousel";
import "../../styles/HomePage.css";
import { useEffect, useState } from "react";
import type { Video } from "../../types/video";

export default function () {
  const { t } = useTranslation();
  const [infoVideos, setInfoVideos] = useState<Video[]>();
  useEffect(() => {
    const urlForVideos = `${import.meta.env.VITE_API_URL}/api/videos`;
    recoverInfoVideos(urlForVideos);
  }, []);

  async function recoverInfoVideos(url: string) {
    const request = await fetch(url);
    const datas = await request.json();
    setInfoVideos(datas);
  }

  return infoVideos && infoVideos?.length > 0 ? (
    <div className="home-page">
      <section>
        <h1 className="home-page-title">{t("title-homePage")}</h1>
        <HeroSlider videos={infoVideos} />
      </section>
      <section>
        <h2 className="home-page-subtitle">{t("subtitle-popular")}</h2>
        <MiniVideoCarousel videos={infoVideos} />
      </section>
      <section>
        <h2 className="home-page-subtitle">{t("subtitle-newIn")}</h2>
        <MiniVideoCarousel videos={infoVideos} />
      </section>
    </div>
  ) : null;
}
