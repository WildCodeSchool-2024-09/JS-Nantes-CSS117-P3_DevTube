import type { VideosSectionByCategoryProps } from "../../types/VideosSectionByCategoryProps";
import VideoCard from "../VideoCard/VideoCard";

export default function VideosSectionByCategory({
  isVideosSectionOpen,
  videosByCategory,
  setVideoToUpdate,
  setVideosSectionOpen,
  setInfoVideoOpen,
  isInfoVideoOpen,
}: VideosSectionByCategoryProps) {
  const handleClickVideo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const idToFind = event.currentTarget.dataset.id;

    if (idToFind) {
      const videoToFind = videosByCategory?.find((video) => {
        return String(video.id) === idToFind;
      });
      setVideoToUpdate(videoToFind);
    }
    setVideosSectionOpen(!isVideosSectionOpen);
    setInfoVideoOpen(!isInfoVideoOpen);
  };
  return (
    <section className={`videos-list ${isVideosSectionOpen ? "" : "hidden"}`}>
      {videosByCategory?.map((video) => (
        <button
          key={video.id}
          type="button"
          data-id={video.id}
          onClick={(event) => handleClickVideo(event)}
        >
          <VideoCard
            key={video.id}
            title={video.name}
            thumbnailUrl={`${import.meta.env.VITE_API_URL}${video.preview_image}`}
            isFreemium={video.is_freemium}
            duration={video.duration}
          />
        </button>
      ))}
    </section>
  );
}
