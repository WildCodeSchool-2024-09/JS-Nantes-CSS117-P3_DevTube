import { useState } from "react";
import "./../../styles/MiniVideoCarousel.css";
import { Link } from "react-router-dom";
import type { Video } from "../../types/video";
import useTheme from "../../utils/useTheme";
import VideoCard from "../VideoCard/VideoCard";
import SkeletonCard from "./SkeletonCard";

interface MiniVideoCarouselProps {
  videos: Video[];
}

const MiniVideoCarousel: React.FC<MiniVideoCarouselProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const videosPerPage = 1;
  const { theme } = useTheme();

  const skeletonList = Array(20)
    .fill("skel")
    .map((s, index) => {
      return {
        id: `${s}-${index}`,
        name: "skeletonCard",
      };
    });

  // Fonction pour passer à la vidéo suivante
  const nextSlide = () => {
    if (currentIndex + videosPerPage < videos.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Fonction pour revenir à la vidéo précédente
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slideWidthPixels = 300 + 18; //on ajoute la shadow
  const trackWidthPixels = videos.length * slideWidthPixels;

  return (
    <div className="carousel-wrapper">
      <button
        type="button"
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="carousel-arrow prev"
      >
        <img
          className="arrow-button"
          src={
            theme ? "/arrow-left-for-light-theme.png" : "/arrow-left-white.png"
          }
          alt="arrow left"
        />
      </button>
      <section className="carousel-container">
        <div
          className="carousel-track"
          style={{
            // on translate la track de la largeur d'une carte + le gap * par l'index courant
            transform: `translateX(-${currentIndex * slideWidthPixels}px)`,
            width: `${trackWidthPixels}px`,
          }}
        >
          {videos.map((video) => (
            <Link
              to={`/video/${video.id}`}
              key={video.id}
              className="carousel-slide"
            >
              <VideoCard
                key={video.id}
                title={video.name}
                thumbnailUrl={`${import.meta.env.VITE_API_URL}${video.preview_image}`}
              />
            </Link>
          ))}
          {skeletonList.map((skel) => (
            <SkeletonCard key={skel.id} />
          ))}
        </div>
      </section>
      <button
        type="button"
        onClick={nextSlide}
        disabled={currentIndex + videosPerPage >= videos.length}
        className="carousel-arrow next"
      >
        <img
          className="arrow-button"
          src={
            theme
              ? "/arrow-right-for-light-theme.png"
              : "/arrow-right-white.svg"
          }
          alt="arrow right"
        />
      </button>
    </div>
  );
};

export default MiniVideoCarousel;
