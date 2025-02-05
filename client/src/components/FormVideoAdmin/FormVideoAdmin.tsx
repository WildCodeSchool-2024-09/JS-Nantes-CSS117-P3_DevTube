import { useEffect, useState } from "react";
import "../../styles/FormVideoManager.css";
import type { Video } from "../../types/video";
import useToast from "../../utils/useToastify";
import VideoCard from "../VideoCard/VideoCard";

export default function FormVideoAdmin() {
  const { notifyError, notifySuccess } = useToast();
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const [idCategory, setIdCategory] = useState<number>();
  const [videosByCategory, setVideosByCategory] = useState<Video[]>();
  const [isInfoVideoOpen, setInfoVideoOpen] = useState<boolean>(false);
  const [isVideosSectionOpen, setVideosSectionOpen] = useState<boolean>(false);
  const [videoToUpdate, setVideoToUpdate] = useState<Video>();

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

  const handleClickCategory = (id: number) => {
    setVideosSectionOpen(!isVideosSectionOpen);
    setIdCategory(id);
  };

  const handleClickVideo = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const idToFind = event.currentTarget.dataset.id;

    if (idToFind) {
      const videoToFind = videosByCategory?.find((video) => {
        return String(video.id) === idToFind;
      });
      setVideoToUpdate(videoToFind);
    }
    setVideosSectionOpen(!isVideosSectionOpen);
    setInfoVideoOpen(!isInfoVideoOpen);
  };

  const handleUpdateVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const newVideo = {
      ...data,
      preview_image: data.preview_image
        ? data.preview_image
        : videoToUpdate?.preview_image,
      is_heroSlide: data.is_heroSlide ? 1 : 0,
      is_freemium: data.is_freemium ? 1 : 0,
      is_popular: data.is_popular ? 1 : 0,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoToUpdate?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVideo),
        },
      );
      if (!response.ok) {
        throw new Error("An unknown error occurred.");
      }
      notifySuccess(`The video ${videoToUpdate?.name} has been updated.`);
      setVideosSectionOpen(!isVideosSectionOpen);
      setInfoVideoOpen(!isInfoVideoOpen);
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  const handleDeleteVideo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoToUpdate?.id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("An unknown error occurred.");
      }
      notifySuccess(`The video ${videoToUpdate?.name} has been removed.`);
      setVideosSectionOpen(!isVideosSectionOpen);
      setInfoVideoOpen(!isInfoVideoOpen);
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  return (
    <section className="video-manager-wrapper">
      <form className="form-admin-wrapper">
        <h2>Video manager</h2>
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
            onChange={(event) =>
              handleClickCategory(Number(event.target.value))
            }
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
      <form onSubmit={handleUpdateVideo}>
        <section className={isVideosSectionOpen ? "" : "hidden"}>
          {videosByCategory?.map((video) => (
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
          ))}
        </section>
        <section className={isInfoVideoOpen ? "" : "hidden"}>
          <fieldset>
            <legend>Main information video</legend>
            <label htmlFor="name">Title</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={videoToUpdate?.name}
              required
            />
            <label id="added_date" htmlFor="added_date">
              Publication date
            </label>
            <input
              type="text"
              name="added_date"
              defaultValue={videoToUpdate?.added_date}
              required
            />
            <label id="duration" htmlFor="duration">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              defaultValue={videoToUpdate?.duration}
              required
            />
            <label id="description" htmlFor="description">
              Description
            </label>
            <textarea
              defaultValue={videoToUpdate?.description}
              name="description"
              maxLength={255}
              aria-labelledby="description"
              required
            />
            <label htmlFor="is_heroSlide" className="heroSlide-label-wrapper">
              Add in hero slider
              <input
                type="checkbox"
                defaultChecked={videoToUpdate?.is_heroSlide === 1}
                id="is_heroSlide"
                name="is_heroSlide"
                className="admin-check-box"
              />
            </label>
            <label htmlFor="is_freemium" className="is_freemium-label-wrapper">
              Freemium Video
              <input
                type="checkbox"
                defaultChecked={videoToUpdate?.is_freemium === 1}
                id="is_freemium"
                name="is_freemium"
                className="admin-check-box"
              />
            </label>
            <label htmlFor="is_popular" className="s_popular-label-wrapper">
              Add in popular carousel
              <input
                type="checkbox"
                defaultChecked={videoToUpdate?.is_popular === 1}
                id="is_popular"
                name="is_popular"
                className="admin-check-box"
              />
            </label>
            <label id="category-title" htmlFor="category-title">
              Title of the catergory
            </label>
            <input
              defaultValue={videoToUpdate?.category_id}
              type="text"
              name="category-id"
              readOnly
              aria-labelledby="category-id"
              required
            />
          </fieldset>
          <section>
            <img
              src={`${import.meta.env.VITE_API_URL}${videoToUpdate?.preview_image}`}
              alt="The preview of the video."
            />
            <label htmlFor="preview_image">Current preview image</label>
            <input
              type="file"
              id="preview_image"
              name="preview_image"
              accept="image/png, image/jpeg"
            />
          </section>

          <section>
            <label htmlFor="thumbnail">
              Current file video : <span>{`${videoToUpdate?.thumbnail}`}</span>
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="video/*, .mp4"
            />
          </section>
          <button type="submit" className="btntTtest standard-button">
            Update
          </button>
          <button
            type="button"
            onClick={handleDeleteVideo}
            className="btntTtest standard-button"
          >
            Delete
          </button>
        </section>
      </form>
    </section>
  );
}
