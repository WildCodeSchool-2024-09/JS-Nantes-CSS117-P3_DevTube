import type { Video } from "./video";

interface OutletContextVideoManagerProps {
  videoToUpdate: Video;
  setVideoToUpdate: (Video) => void;
  isInfoVideoOpen: boolean;
  setInfoVideoOpen: (value) => void;
  isVideosSectionOpen: boolean;
  setVideosSectionOpen: (value) => void;
  needToRefetch: boolean;
  setNeedToRefetch: (value) => void;
}
