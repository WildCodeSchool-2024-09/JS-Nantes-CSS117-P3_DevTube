import { useEffect, useState } from "react";
import "../../styles/FormVideoManager.css";
import type { Video } from "../../types/video";
import useToast from "../../utils/useToastify";
import VideoCard from "../VideoCard/VideoCard";

export default function FormVideoAdmin() {
  const { notifyError } = useToast();
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
      console.warn({ videoToUpdate });
    }
    setVideosSectionOpen(!isVideosSectionOpen);
    setInfoVideoOpen(!isInfoVideoOpen);
  };

  return (
    <div className="video-manager-wrapper">
      <form className="form-admin-wrapper ">
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
          <label htmlFor="category-select">
            Choose a category language of videos:
          </label>
          <select
            name="categories"
            id="category-select"
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
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={videoToUpdate?.name}
              required
            />
            <label id="publication-date" htmlFor="publication-date">
              Publication date
            </label>
            <input
              type="text"
              name="publication-date"
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
              // placeholder="Enter your description here..."
              aria-labelledby="description"
              required
            />
            <label
              htmlFor="add-hero-slider"
              className="heroSlide-label-wrapper"
            >
              Add in hero slider
              <input
                type="checkbox"
                checked={videoToUpdate?.is_heroSlide === 1}
                // onChange={updateVideoHeroSlidetatus}
                id="add-hero-slider"
                name="add-hero-slider"
                className="admin-check-box"
              />
            </label>
            <label id="category-title" htmlFor="category-title">
              Title of the catergory
            </label>
            <input
              defaultValue={videoToUpdate?.category_id}
              type="text"
              name="category-title"
              readOnly
              aria-labelledby="category-title"
              required
            />
            {/* <label id="newcategory" htmlFor="newcategory">
              Select a new catergory
            </label>{" "}
            <select name="" id="">
              <option value="">Front-end</option>
              <option value="">Back-end</option>
              <option value="">Bases</option>
            </select> */}
          </fieldset>
          <img
            src={`${import.meta.env.VITE_API_URL}${videoToUpdate?.preview_image}`}
            alt="The preview of the video."
          />

          <section>
            <p>
              Current file video : <span>{`${videoToUpdate?.thumbnail}`}</span>
            </p>
            <input type="file" id="video-file" accept="video/*, .mp4" />
          </section>
        </section>
        <button
          type="button"
          // onClick={handleUpdateUser}
          className="btntTtest standard-button"
        >
          Update
        </button>
        <button
          type="button"
          // onClick={handleDeleteUser}
          className="btntTtest standard-button"
        >
          Delete
        </button>
        {/* 
        <fieldset>
          <label id="subscription-date" htmlFor="subscription-date">
            Subscription date
          </label>
          <input
            type="text"
            name="publication-date"
            defaultValue="" //{(convertRegistrationDate as string) || ""}
            aria-labelledby="publication-date"
            required
          />
        </fieldset> */}

        {/* <section className="admin-btn-wrapper">
          <button
            type="button"
            // onClick={handleUpdateUser}
            className="btntTtest standard-button"
          >
            New
          </button>
          <button
            type="button"
            // onClick={handleUpdateUser}
            className="btntTtest standard-button"
          >
            Update
          </button>
          <button
            type="button"
            // onClick={handleDeleteUser}
            className="btntTtest standard-button"
          >
            Delete
          </button>
        </section> */}
      </form>
    </div>
  );
}
