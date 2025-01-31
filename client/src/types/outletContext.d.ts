import type { Video } from "./video";

interface OutletContextProps {
  infoVideos: Video[];
  setInfoVideos: (data: Video[]) => void;
}
