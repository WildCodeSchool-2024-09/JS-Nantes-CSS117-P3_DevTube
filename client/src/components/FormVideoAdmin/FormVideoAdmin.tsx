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
    let currentPreviewImage = null;
    if (videoToUpdate?.preview_image) {
      const currentPreviewImageFileName = videoToUpdate?.preview_image.split(
        "/",
      )[videoToUpdate?.preview_image.split("/").length - 1] as string;
      const currentPreviewImageAsAFile = await fetch(
        `${import.meta.env.VITE_API_URL}${videoToUpdate?.preview_image}`,
      ).then(async (response) => {
        // const contentType = response.headers.get("content-type"); TODO VERIFY if content-type is needed
        const blob = await response.blob();

        const file = new File([blob], currentPreviewImageFileName);
        return file;
      });
      currentPreviewImage = currentPreviewImageAsAFile;
    }

    const preview_image_path = `/assets/images/videoPreviewImages/${(data.preview_image as File)?.name || (currentPreviewImage as File).name}`;

    const newVideo = {
      ...data,
      preview_image_path,
      preview_image: data.preview_image
        ? data.preview_image
        : currentPreviewImage,
      is_heroSlide: data.is_heroSlide ? 1 : 0,
      is_freemium: data.is_freemium ? 1 : 0,
      is_popular: data.is_popular ? 1 : 0,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoToUpdate?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoToUpdate?.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
      </form>
    </section>
  );
}
