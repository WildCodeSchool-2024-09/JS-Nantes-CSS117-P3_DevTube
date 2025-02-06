import type { Video } from "./video";

interface OutletContextVideoManagerProps {
  videoToUpdate: Video;
  setVideoToUpdate: (Video) => void;
}
