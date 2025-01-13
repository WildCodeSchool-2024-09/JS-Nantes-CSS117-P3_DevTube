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

interface HeroSliderProps {
  videos: Video[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Fonction pour passer à la vidéo suivante
  const nextSlide = () => {
    if (currentIndex + 1 < videos.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Fonction pour revenir à la vidéo précédente
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const trackWidthPercent = 100 * videos.length; //100% * le nombre de videos = largeur de la track en pourcent
  const slideWidthPercent = 100 / videos.length; //1 unite parmis toutes les videos = 100% de la track divise par le nombre de video

  return (
    <>
      <div
        className="carousel-wrapper"
        style={{
          maxWidth: 1024,
          margin: "auto",
        }}
      >
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
              // on translate la track de la laregeur d une carte / par l index courant en pourcentage
              transform:
                currentIndex === 0
                  ? undefined
                  : // on decale negativement la track vers la gauche (-) la largeur d'une slide multiplie par l'index courrant (ex : une slide de 400px * l'index 4 = 400px * 4 vers la gauche)
                    //  et on ajoute la valeur du gap mu;tiplie par l'index courant (donc par le nombre de slide concerne par le decalage)
                    `translateX(calc(-${slideWidthPercent * currentIndex}% - ${18 * currentIndex}px))`,
              width: `${trackWidthPercent}%`,
            }}
          >
            {videos.map((video) => (
              <div
                className="carousel-slide"
                key={video.id}
                style={{
                  flex: `0 0 ${slideWidthPercent}%`,
                  //Cette valeur determine quel espace chaque slide occupe sur la track en pourcentage
                  // Chaque slide a un flex basis (l'espace qu"elle essaie de prendre dans le flex courrant) du pourcentage de la slide par rapport a la track
                }}
              >
                <VideoCard
                  title={video.title}
                  thumbnailUrl="https://placehold.co/1024x480"
                  isLarge
                  displayCardInfo={false}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={nextSlide}
          disabled={currentIndex + 1 >= videos.length}
          className="carousel-arrow next"
        >
          <img className="arrow-button" src={arrowRight} alt="arrow right" />
        </button>
      </div>
    </>
  );
};

export default HeroSlider;
