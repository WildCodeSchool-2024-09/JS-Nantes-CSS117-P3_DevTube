import type { Video } from "../../types/video";
import VideoCard from "../VideoCard/VideoCard";

interface VideosSectionByCategoryProps {
  isVideosSectionOpen: boolean;
  videosByCategory: Video[] | undefined;
  setVideoToUpdate: (object: Video | undefined) => void;
  setVideosSectionOpen: (value: boolean) => void;
  setInfoVideoOpen: (value: boolean) => void;
  isInfoVideoOpen: boolean;
}
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
