import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { OutletContextVideoManagerProps } from "../../types/outletContextVideoManager";
import type { Video } from "../../types/video";
import useToast from "../../utils/useToastify";
import VideoCard from "../VideoCard/VideoCard";
import "../../styles/FormVideoManager.css";

export default function SearchVideoByCategory() {
  const { notifyError } = useToast();
  const [idCategory, setIdCategory] = useState<number>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [videosByCategory, setVideosByCategory] = useState<Video[]>();
  const outletContext = useOutletContext<OutletContextVideoManagerProps>();

  useEffect(() => {
    if (idCategory || outletContext.needToRefetch) {
      const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${idCategory}`;
      recoverInfoVideos(urlForVideos);
    }
  }, [idCategory, outletContext.needToRefetch]);

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

  const handleClickCategory = (id: number) => {
    setIdCategory(id);
    if (!outletContext.isVideosSectionOpen) {
      outletContext.setVideosSectionOpen(!outletContext.isVideosSectionOpen);
    }
    if (outletContext.isInfoVideoOpen) {
      outletContext.setInfoVideoOpen(!outletContext.isInfoVideoOpen);
    }
  };

  const handleClickVideo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const idToFind = event.currentTarget.dataset.id;

    if (idToFind) {
      const videoToFind = videosByCategory?.find((video) => {
        return String(video.id) === idToFind;
      });
      outletContext.setVideoToUpdate(videoToFind);
      outletContext.setInfoVideoOpen(!outletContext.isInfoVideoOpen);
      outletContext.setVideosSectionOpen(!outletContext.isVideosSectionOpen);
    }
  };

  return (
    <>
      <form>
        <fieldset>
          <label htmlFor="category_id">
            Choose a category language of videos:
          </label>
          <select
            name="category_id"
            id="category_id"
            onChange={(event) =>
              handleClickCategory(Number(event.target.value))
            }
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
      <section
        className={`videos-section ${outletContext.isVideosSectionOpen ? "" : "hidden"}`}
      >
        {videosByCategory?.length ? (
          videosByCategory?.map((video) => (
            <button
              key={video.id}
              type="button"
              data-id={video.id}
              onClick={(event) => handleClickVideo(event)}
            >
              <VideoCard
                key={video.id}
                title={video.name}
                thumbnailUrl={`${import.meta.env.VITE_API_URL}${video.preview_image}`}
                isFreemium={video.is_freemium}
                duration={video.duration}
              />
            </button>
          ))
        ) : (
          <p>No videos in this category yet</p>
        )}
      </section>
    </>
  );
}
