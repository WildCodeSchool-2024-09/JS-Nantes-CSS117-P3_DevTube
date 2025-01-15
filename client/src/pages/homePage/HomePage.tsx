import { useTranslation } from "react-i18next";
import HeroSlider from "../../components/Carousels/HeroSlider";
import MiniVideoCarousel from "../../components/Carousels/MiniVideoCarousel";
import "../../styles/HomePage.css";

// FAKE DATA TO TEST CAROUSEL
const videosData = [
  {
    id: "1",
    thumbnailUrl:
      "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
    title: "Vidéo 1",
  },
  {
    id: "2",
    thumbnailUrl:
      "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
    title: "Vidéo 2",
  },
  {
    id: "3",
    thumbnailUrl:
      "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
    title: "Vidéo 3",
  },
  {
    id: "4",
    thumbnailUrl:
      "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
    title: "Vidéo 4",
  },
  {
    id: "5",
    thumbnailUrl:
      "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
    title: "Vidéo 5",
  },
  {
    id: "6",
    thumbnailUrl:
      "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
    title: "Vidéo 6",
  },
  {
    id: "7",
    thumbnailUrl:
      "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
    title: "Vidéo 7",
  },
  {
    id: "8",
    thumbnailUrl:
      "http://localhost:3310/assets/images/videoPreviewImages/apercu-ex.png",
    title: "Vidéo 8",
  },
];

export default function () {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <section>
        <h1 className="home-page-title">{t("title-homePage")}</h1>
        <HeroSlider videos={videosData} />
      </section>
      <section>
        <h2 className="home-page-subtitle">{t("subtitle-popular")}</h2>
        <MiniVideoCarousel videos={videosData} />
      </section>
      <section>
        <h2 className="home-page-subtitle">{t("subtitle-newIn")}</h2>
        <MiniVideoCarousel videos={videosData} />
      </section>
    </div>
  );
}
