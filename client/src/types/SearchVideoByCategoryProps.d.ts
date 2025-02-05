import type { Video } from "./video";

export interface SearchVideoByCategoryProps {
  isVideosSectionOpen: boolean;
  setVideosByCategory: (data: Video[]) => void;
  setVideosSectionOpen: (value: boolean) => void;
  isInfoVideoOpen: boolean;
  setInfoVideoOpen: (value: boolean) => void;
  isUpdateChoiceOpen: boolean;
  setisUpdateChoiceOpen: (value: boolean) => void;
  setSearchBarOpen: (value: boolean) => void;
  isSearchBarOpen: boolean;
}
