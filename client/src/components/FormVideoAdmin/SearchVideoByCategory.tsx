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
  shouldRefetch,
}: SearchVideoByCategoryProps) {
  const { notifyError } = useToast();
  const [idCategory, setIdCategory] = useState<number>();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (idCategory || shouldRefetch) {
      const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${idCategory}`;
      recoverInfoVideos(urlForVideos);
    }
  }, [idCategory, shouldRefetch]);

  useEffect(() => {
    const urlForCategories = `${import.meta.env.VITE_API_URL}/api/categories`;
    recoverCategories(urlForCategories);
  }, []);

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

  async function recoverCategories(url: string) {
    const token = localStorage.getItem("token");

    try {
      const request = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const datas = await request.json();
      setCategories(datas);
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
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </fieldset>
    </form>
  );
}
