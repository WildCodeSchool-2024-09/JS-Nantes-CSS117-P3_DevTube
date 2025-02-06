import { useEffect, useState } from "react";
import type { Video } from "../../types/video";
import useToast from "../../utils/useToastify";

interface SearchVideoByCategoryProps {
  isVideosSectionOpen: boolean;
  setVideosByCategory: (data: Video[]) => void;
  setVideosSectionOpen: (value: boolean) => void;
  isInfoVideoOpen: boolean;
  setInfoVideoOpen: (value: boolean) => void;
  shouldRefetch?: boolean;
}

export default function SearchVideoByCategory({
  isVideosSectionOpen,
  setVideosSectionOpen,
  setVideosByCategory,
  isInfoVideoOpen,
  setInfoVideoOpen,
  shouldRefetch,
}: SearchVideoByCategoryProps) {
  const { notifyError } = useToast();
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const [idCategory, setIdCategory] = useState<number>();

  useEffect(() => {
    if (idCategory || shouldRefetch) {
      const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${idCategory}`;
      recoverInfoVideos(urlForVideos);
    }
  }, [idCategory, shouldRefetch]);

  async function recoverInfoVideos(url: string) {
    const token = localStorage.getItem("token");

    try {
      const request = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const datas = await request.json();
      setVideosByCategory(datas);
    } catch (err) {
      notifyError("You are log out !");
    }
  }

  const handleClickCategory = (id: number) => {
    isVideosSectionOpen
      ? setVideosSectionOpen(false)
      : setVideosSectionOpen(true);
    setIdCategory(id);
    isInfoVideoOpen && setInfoVideoOpen(!isInfoVideoOpen);
  };

  return (
    <form className="form-admin-wrapper">
      <button
        type="button"
        onClick={() => setSearchBarOpen(!isSearchBarOpen)}
        className="btntTtest standard-button"
      >
        {isSearchBarOpen
          ? "Hide search bar"
          : "I want to update or delete a video"}
      </button>

      <fieldset className={isSearchBarOpen ? "" : "hidden"}>
        <label htmlFor="category_id">
          Choose a category language of videos:
        </label>
        <select
          name="category_id"
          id="category_id"
          onChange={(event) => handleClickCategory(Number(event.target.value))}
        >
          <option value="">
            --Please choose a category language of videos--
          </option>
          <option value="1">HTML</option>
          <option value="2">CSS</option>
          <option value="3">Algo</option>
          <option value="4">Javascript</option>
          <option value="5">Node.js</option>
          <option value="6">REACT</option>
          <option value="7">github</option>
          <option value="8">SQL</option>
          <option value="9">EXPRESS</option>
        </select>
      </fieldset>
    </form>
  );
}
