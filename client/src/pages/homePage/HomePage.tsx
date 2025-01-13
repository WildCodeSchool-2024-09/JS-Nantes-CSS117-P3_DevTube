import HeroSlider from "../../components/Carousels/HeroSlider";
import MiniVideoCarousel from "../../components/Carousels/MiniVideoCarousel";
import "../../styles/HomePage.css";

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
  return (
    <div className="home-page">
      <section>
        <h1 className="home-page-title">Welcome to DevTube</h1>
        <HeroSlider videos={videosData} />
      </section>
      <section>
        <h2 className="home-page-subtitle">Popular</h2>
        <MiniVideoCarousel videos={videosData} />
      </section>
      <section>
        <h2 className="home-page-subtitle">New in</h2>
        <MiniVideoCarousel videos={videosData} />
      </section>
    </div>
  );
}
