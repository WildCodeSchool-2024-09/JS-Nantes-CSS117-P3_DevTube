import { useTranslation } from "react-i18next";
import HeroSlider from "../../components/Carousels/HeroSlider";
import MiniVideoCarousel from "../../components/Carousels/MiniVideoCarousel";
import "../../styles/HomePage.css";
import { useEffect, useState } from "react";
import type { Video } from "../../types/video";

// FAKE DATA TO TEST CAROUSEL
// const videosData = [
//   {
//     id: "1",
//     thumbnailUrl:
//       "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
//     title: "Vidéo 1",
//   },
//   {
//     id: "2",
//     thumbnailUrl:
//       "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
//     title: "Vidéo 2",
//   },
//   {
//     id: "3",
//     thumbnailUrl:
//       "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
//     title: "Vidéo 3",
//   },
//   {
//     id: "4",
//     thumbnailUrl:
//       "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
//     title: "Vidéo 4",
//   },
//   {
//     id: "5",
//     thumbnailUrl:
//       "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
//     title: "Vidéo 5",
//   },
//   {
//     id: "6",
//     thumbnailUrl:
//       "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
//     title: "Vidéo 6",
//   },
//   {
//     id: "7",
//     thumbnailUrl:
//       "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
//     title: "Vidéo 7",
//   },
//   {
//     id: "8",
//     thumbnailUrl:
//       "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
//     title: "Vidéo 8",
//   },
// ];

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
      try {
        const request = await fetch(url);
        const datas = await request.json();
        setInfoVideos(datas); //currentState au cas ou on oublie de passer une valeur ou si la donnee est caduque, il y aura toujours l,ancienne valeur qui s'affichera
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
      } catch (error) {
        alert("Sorry, we met a problem. Please, come back later.");
      }
    }
  }

  return infoVideos && infoVideos?.length > 0 ? (
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
  ) : null;
}
