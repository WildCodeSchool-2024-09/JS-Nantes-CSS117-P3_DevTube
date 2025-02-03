import { useState } from "react";
import "../../styles/FormVideoManager.css";
import type { Video } from "../../types/video";
import useToast from "../../utils/useToastify";
import SearchVideoByCategory from "./SearchVideoByCategory";
import VideosSectionByCategory from "./VideosSectionByCategory";

export default function FormVideoAdmin() {
  const { notifyError, notifySuccess } = useToast();
  const [videosByCategory, setVideosByCategory] = useState<Video[]>();
  const [isInfoVideoOpen, setInfoVideoOpen] = useState<boolean>(false);
  const [isVideosSectionOpen, setVideosSectionOpen] = useState<boolean>(false);
  const [videoToUpdate, setVideoToUpdate] = useState<Video>();

  const handleUpdateVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    // const previewImage = data.preview_image
    //   ? data.preview_image
    //   : videoToUpdate?.preview_image;
    console.info(data);
    const newVideo = {
      ...data,
      preview_image: data.preview_image
        ? data.preview_image
        : videoToUpdate?.preview_image,
      is_heroSlide: data.is_heroSlide ? 1 : 0,
      is_freemium: data.is_freemium ? 1 : 0,
      is_popular: data.is_popular ? 1 : 0,
    };
    // console.log({ newVideo });
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
      <h2>Video manager</h2>
      <SearchVideoByCategory
        isVideosSectionOpen={isVideosSectionOpen}
        setVideosSectionOpen={setVideosSectionOpen}
        setVideosByCategory={setVideosByCategory}
        isInfoVideoOpen={isInfoVideoOpen}
        setInfoVideoOpen={setInfoVideoOpen}
      />
      <form onSubmit={handleUpdateVideo}>
        <VideosSectionByCategory
          isVideosSectionOpen={isVideosSectionOpen}
          videosByCategory={videosByCategory}
          setVideoToUpdate={setVideoToUpdate}
          setVideosSectionOpen={setVideosSectionOpen}
          setInfoVideoOpen={setInfoVideoOpen}
          isInfoVideoOpen={isInfoVideoOpen}
        />
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
            {/* <label id="newcategory" htmlFor="newcategory">
              Select a new catergory
            </label>{" "}
            <select name="" id="">
              <option value="">Front-end</option>
              <option value="">Back-end</option>
              <option value="">Bases</option>
            </select> */}
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
    </section>
  );
}
