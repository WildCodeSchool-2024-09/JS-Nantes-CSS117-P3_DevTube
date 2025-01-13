import { useState } from "react";
import "./../../styles/MiniVideoCarousel.css";
import arrowLeft from "/arrow-left-white.png";
import arrowRight from "/arrow-right-white.svg";
import VideoCard from "../VideoCard/VideoCard";

interface Video {
  id: string;
  thumbnailUrl: string;
  title: string;
}

interface MiniVideoCarouselProps {
  videos: Video[];
}

const MiniVideoCarousel: React.FC<MiniVideoCarouselProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const videosPerPage = 1;

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

  const slideWidthPixels = 300 + 18;
  const trackWidthPixels = videos.length * slideWidthPixels;

  return (
    <>
      <div className="carousel-wrapper">
        <button
          type="button"
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="carousel-arrow prev"
        >
          <img className="arrow-button" src={arrowLeft} alt="arrow left" />
        </button>
        <div className="carousel-container">
          <div
            className="carousel-track"
            style={{
              // on translate la track de la laregeur d une carte + le gap * par l index courant
              transform: `translateX(-${currentIndex * slideWidthPixels}px)`,
              width: `${trackWidthPixels}px`,
            }}
          >
            {videos.map((video) => (
              <div key={video.id} className="carousel-slide">
                <VideoCard
                  key={video.id}
                  title={video.title}
                  thumbnailUrl={video.thumbnailUrl}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={nextSlide}
          disabled={currentIndex + videosPerPage >= videos.length}
          className="carousel-arrow next"
        >
          <img className="arrow-button" src={arrowRight} alt="arrow right" />
        </button>
      </div>
    </>
  );
};

export default MiniVideoCarousel;
