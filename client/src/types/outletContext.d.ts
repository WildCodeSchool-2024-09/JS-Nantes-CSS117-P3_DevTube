import type { Favorite } from "./Favorite";
import type { Video } from "./video";

interface OutletContextProps {
  infoVideos: Video[];
  setInfoVideos: (data: Video[]) => void;
  favUser: Favorite;
  setFavUser: (data: Favorite) => void;
  userId: number;
}
