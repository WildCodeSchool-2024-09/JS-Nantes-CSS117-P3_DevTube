import { useEffect, useState } from "react";
import type { SearchVideoByCategoryProps } from "../../types/SearchVideoByCategoryProps";
import useToast from "../../utils/useToastify";

export default function SearchVideoByCategory({
  isVideosSectionOpen,
  setVideosSectionOpen,
  setVideosByCategory,
  isInfoVideoOpen,
  setInfoVideoOpen,
  isUpdateChoiceOpen,
  setisUpdateChoiceOpen,
  setSearchBarOpen,
  isSearchBarOpen,
  isCategoryCreationSectionOpen,
}: SearchVideoByCategoryProps) {
  const { notifyError } = useToast();
  const [idCategory, setIdCategory] = useState<number>();

  useEffect(() => {
    if (idCategory) {
      const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${idCategory}`;
      recoverInfoVideos(urlForVideos);
    }
  }, [idCategory]);

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

  const updateChoiceClick = () => {
    setSearchBarOpen(!isSearchBarOpen);
    setisUpdateChoiceOpen(!isUpdateChoiceOpen);
    setVideosSectionOpen(!isVideosSectionOpen);
  };

  const handleClickCategory = (id: number) => {
    setVideosSectionOpen(!isVideosSectionOpen);
    setIdCategory(id);
    isInfoVideoOpen && setInfoVideoOpen(!isInfoVideoOpen);
  };

  return (
    <form>
      {!isUpdateChoiceOpen && !isCategoryCreationSectionOpen && (
        <button
          type="button"
          onClick={updateChoiceClick}
          className="admin-link"
        >
          "Update or Delete"
        </button>
      )}

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
