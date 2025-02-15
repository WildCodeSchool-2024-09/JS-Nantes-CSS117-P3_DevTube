import type { Favorite } from "./Favorite";
import type { Video } from "./video";

interface OutletContextProps {
  infoVideos: Video[];
  setInfoVideos: (data: Video[]) => void;
  favUserList: Favorite[];
  setFavUserList: (data: Favorite[]) => void;
  userId: number;
  needToRefetchFavList?: boolean;
  setNeedToRefetchFavList: (value: boolean) => void;
}
