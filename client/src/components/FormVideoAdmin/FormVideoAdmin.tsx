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
  const [isUpdateChoiceOpen, setisUpdateChoiceOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);

  const handleUpdateVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // formData = Ce qu'il y a dans le formulaire au moment de la soumision ce celui-ci
    const formData = new FormData(e.target as HTMLFormElement);
    // on récupère la formData qu'on transforme en Objet "data" pour pouvoir lire ses propriétés
    const data = Object.fromEntries(formData.entries());

    // On définit une varibale previewImageToUpload pour l'instant vide
    // celle-ci sera "remplie" avec le résultat de l'opération suivante
    // qui consite à:
    // Si aucune image est présente dans le formulaire, on vient créer un fichier "File" à partir de l'image
    // par défaut
    // sinon on laisse l'image uploadée
    let previewImageToUpload: File | string = "";
    let thumbnailImageToUpload: File | string = "";

    if (
      data.preview_image instanceof File &&
      data?.preview_image?.name &&
      data?.preview_image?.size > 0
    ) {
      // Nouvelle image sélectionnée
      previewImageToUpload = data.preview_image;
    } else if (videoToUpdate?.preview_image) {
      // On créé un File a partir du chemin de l'image :
      // (on la charge avec fetch puis on prend le blob qui est retourné pour le transformer en File)
      const currentPreviewImageFileName = videoToUpdate?.preview_image.split(
        "/",
      )[videoToUpdate?.preview_image.split("/").length - 1] as string;

      const currentPreviewImageAsAFile = await fetch(
        `${import.meta.env.VITE_API_URL}${videoToUpdate?.preview_image}`,
      ).then(async (response) => {
        const blob = await response.blob();

        const file = new File([blob], currentPreviewImageFileName);
        return file;
      });

      // Image existante conservée
      previewImageToUpload = currentPreviewImageAsAFile;
    }

    if (
      data.thumbnail instanceof File &&
      data?.thumbnail?.name &&
      data?.thumbnail?.size > 0
    ) {
      // Nouvelle image sélectionnée
      thumbnailImageToUpload = data.thumbnail;
    } else if (videoToUpdate?.thumbnail) {
      // On créé un File a partir du chemin de l'image :
      // (on la charge avec fetch puis on prend le blob qui est retourné pour le transformer en File)
      const currentPreviewImageFileName = videoToUpdate?.preview_image.split(
        "/",
      )[videoToUpdate?.thumbnail.split("/").length - 1] as string;

      const currentPreviewImageAsAFile = await fetch(
        `${import.meta.env.VITE_API_URL}${videoToUpdate?.thumbnail}`,
      ).then(async (response) => {
        const blob = await response.blob();

        const file = new File([blob], currentPreviewImageFileName);
        return file;
      });

      // On conserve l'image existante convertie en fichier
      thumbnailImageToUpload = currentPreviewImageAsAFile;
    }

    // On utilise formData.set pour remplacer la valeur
    formData.set("preview_image", previewImageToUpload);
    formData.set("thumbnail", thumbnailImageToUpload);
    formData.set("is_heroSlide", data.is_heroSlide ? "1" : "0");
    formData.set("is_freemium", data.is_freemium ? "1" : "0");
    formData.set("is_popular", data.is_popular ? "1" : "0");
    // transformation de la date ISO en date YYYY-MM-DD
    formData.set(
      "added_date",
      new Date(data.added_date as string).toISOString().substring(0, 10),
    );
    // console.log({ data });

    // TODO: Add 'thumbnail' in formData
    // thumbnail should be data.thumbnail || videoToUpdate?.thumbnail
    // It should be a File, so you'll probably have to fetch it as for preview8image if videoToUpdate?.thumbnail is a path

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoToUpdate?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
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

  const returnClick = () => {
    setSearchBarOpen(!isSearchBarOpen);
    setVideosSectionOpen(false);
    setisUpdateChoiceOpen(!isUpdateChoiceOpen);
    setInfoVideoOpen(!isInfoVideoOpen);
  };

  return (
    <section className="video-manager-wrapper">
      <h2 className="title-video-manager">Video manager</h2>
      <SearchVideoByCategory
        isVideosSectionOpen={isVideosSectionOpen}
        setVideosSectionOpen={setVideosSectionOpen}
        setVideosByCategory={setVideosByCategory}
        isInfoVideoOpen={isInfoVideoOpen}
        setInfoVideoOpen={setInfoVideoOpen}
        isUpdateChoiceOpen={isUpdateChoiceOpen}
        setisUpdateChoiceOpen={setisUpdateChoiceOpen}
        isSearchBarOpen={isSearchBarOpen}
        setSearchBarOpen={setSearchBarOpen}
        shouldRefetch={isInfoVideoOpen}
      />
      {/* {isVideosSectionOpen && (
        <button type="button" className="standard-button" onClick={returnClick}>
          Return
        </button>
      )} */}
      <form onSubmit={handleUpdateVideo}>
        <VideosSectionByCategory
          isVideosSectionOpen={isVideosSectionOpen}
          videosByCategory={videosByCategory}
          setVideoToUpdate={setVideoToUpdate}
          setVideosSectionOpen={setVideosSectionOpen}
          setInfoVideoOpen={setInfoVideoOpen}
          isInfoVideoOpen={isInfoVideoOpen}
        />
        <div className={isInfoVideoOpen ? "" : "hidden"}>
          <InfoVideoToUpdate
            videoToUpdate={videoToUpdate}
            isInfoVideoOpen={isInfoVideoOpen}
          />
          <FilesVideo videoToUpdate={videoToUpdate} />
          <section className="form-buttons-wrapper">
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
            <button
              type="button"
              className="standard-button"
              onClick={returnClick}
            >
              Return
            </button>
          </section>
        </div>
      </form>
    </section>
  );
}
