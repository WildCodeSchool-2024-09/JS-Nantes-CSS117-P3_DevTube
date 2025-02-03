import { useState } from "react";
import "../../styles/FormVideoManager.css";
import type { Video } from "../../types/video";
import useToast from "../../utils/useToastify";
import FilesVideo from "./FilesVideo";
import InfoVideoToUpdate from "./InfoVideoToUpdate";
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
    // console.info(data);
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
        <InfoVideoToUpdate
          isInfoVideoOpen={isInfoVideoOpen}
          videoToUpdate={videoToUpdate}
        />
        <FilesVideo videoToUpdate={videoToUpdate} />
        <section>
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
