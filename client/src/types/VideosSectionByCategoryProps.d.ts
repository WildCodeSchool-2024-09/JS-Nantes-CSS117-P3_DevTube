import type { Video } from "./video";

interface VideosSectionByCategoryProps {
  isVideosSectionOpen: boolean;
  videosByCategory: Video[] | undefined;
  setVideoToUpdate: (object: Video | undefined) => void;
  setVideosSectionOpen: (value: boolean) => void;
  setInfoVideoOpen: (value: boolean) => void;
  isInfoVideoOpen: boolean;
}
