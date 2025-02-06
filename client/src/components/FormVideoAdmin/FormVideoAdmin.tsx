// import { useState } from "react";
import "../../styles/FormVideoManager.css";
// import type { Video } from "../../types/video";
// import useToast from "../../utils/useToastify";
// import CategoryCreation from "./CategoryCreation";
// import FilesVideo from "./FilesVideo";
// import InfoVideoToUpdate from "./InfoVideoToUpdate";
// import SearchVideoByCategory from "./SearchVideoByCategory";
// import VideosSectionByCategory from "./VideosSectionByCategory";

export default function FormVideoAdmin() {
  // const { notifyError, notifySuccess } = useToast();
  //UPDATE OR DELETE A VIDEO CHOICE
  // const [isUpdateChoiceOpen, setisUpdateChoiceOpen] = useState<boolean>(false);
  // const [videosByCategory, setVideosByCategory] = useState<Video[]>();
  // const [isInfoVideoOpen, setInfoVideoOpen] = useState<boolean>(false);
  // const [isVideosSectionOpen, setVideosSectionOpen] = useState<boolean>(false);
  // const [videoToUpdate, setVideoToUpdate] = useState<Video>();
  // const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  //VIDEO CATEGORY CREATION CHOICE
  // const [isCategoryCreationSectionOpen, setIsCategoryCreationSectionOpen] =
  //   useState<boolean>(false);

  // const handleUpdateVideo = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const data = Object.fromEntries(formData.entries());

  //   let previewImageToUpload: File | string = "";

  //   if (data.preview_image instanceof File) {
  //     // Nouvelle image sélectionnée
  //     previewImageToUpload = data.preview_image;
  //   } else if (videoToUpdate?.preview_image && !data.preview_image) {
  //     // On créé un File a partir du chemin de l'image :
  //     // (on la charge avec fetch puis on prend le blob qui est retourné pour le transformer en File)
  //     const currentPreviewImageFileName = videoToUpdate?.preview_image.split(
  //       "/",
  //     )[videoToUpdate?.preview_image.split("/").length - 1] as string;

  //     const currentPreviewImageAsAFile = await fetch(
  //       `${import.meta.env.VITE_API_URL}${videoToUpdate?.preview_image}`,
  //     ).then(async (response) => {
  //       const blob = await response.blob();

  //       const file = new File([blob], currentPreviewImageFileName);
  //       return file;
  //     });
  //     // console.log({ file });

  //     // Image existante conservée
  //     previewImageToUpload = currentPreviewImageAsAFile; // Envoyer le chemin existant
  //   }
  //   //TODO FIX BUG IMAGE UNDEFINED IN THE FORMdata

  //   // On utilise formData.set pour remplacer la valeur
  //   formData.set("preview_image", previewImageToUpload);
  //   formData.set("is_heroSlide", data.is_heroSlide ? "1" : "0");
  //   formData.set("is_freemium", data.is_freemium ? "1" : "0");
  //   formData.set("is_popular", data.is_popular ? "1" : "0");
  //   formData.set(
  //     "thumbnail",
  //     videoToUpdate?.thumbnail ? videoToUpdate?.thumbnail : data.thumbnail,
  //   );
  //   // console.log({ data });

  //   // TODO: Add 'thumbnail' in formData
  //   // thumbnail should be data.thumbnail || videoToUpdate?.thumbnail
  //   // It should be a File, so you'll probably have to fetch it as for preview8image if videoToUpdate?.thumbnail is a path

  //   try {
  //     // console.log({ data });
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/videos/${videoToUpdate?.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: formData,
  //       },
  //     );
  //     if (!response.ok) {
  //       throw new Error("An unknown error occurred.");
  //     }
  //     notifySuccess(`The video ${videoToUpdate?.name} has been updated.`);
  //     setVideosSectionOpen(!isVideosSectionOpen);
  //     setInfoVideoOpen(!isInfoVideoOpen);
  //   } catch (err) {
  //     notifyError((err as Error).message);
  //   }
  // };

  // const handleDeleteVideo = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/videos/${videoToUpdate?.id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     if (!response.ok) {
  //       throw new Error("An unknown error occurred.");
  //     }
  //     notifySuccess(`The video ${videoToUpdate?.name} has been removed.`);
  //     setVideosSectionOpen(!isVideosSectionOpen);
  //     setInfoVideoOpen(!isInfoVideoOpen);
  //   } catch (err) {
  //     notifyError((err as Error).message);
  //   }
  // };

  // const returnClick = () => {
  //   setSearchBarOpen(!isSearchBarOpen);
  //   setVideosSectionOpen(false);
  //   setisUpdateChoiceOpen(!isUpdateChoiceOpen);
  //   setInfoVideoOpen(!isInfoVideoOpen);
  // };

  return (
    <section className="video-manager-wrapper">
      <h2 className="title-video-manager">Video manager</h2>
      {/* UPDATE OR DELETE SESSION */}
      {/* <SearchVideoByCategory
        // isVideosSectionOpen={isVideosSectionOpen}
        // setVideosSectionOpen={setVideosSectionOpen}
        // setVideosByCategory={setVideosByCategory}
        isInfoVideoOpen={isInfoVideoOpen}
        setInfoVideoOpen={setInfoVideoOpen}
        isUpdateChoiceOpen={isUpdateChoiceOpen}
        setisUpdateChoiceOpen={setisUpdateChoiceOpen}
        isSearchBarOpen={isSearchBarOpen}
        setSearchBarOpen={setSearchBarOpen}
        isCategoryCreationSectionOpen={isCategoryCreationSectionOpen}
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
        <div className={isInfoVideoOpen ? "" : "hidden"}>
          <InfoVideoToUpdate videoToUpdate={videoToUpdate} />
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
      {/* CREATE A NEW VIDEOS CATEGORY SESSION */}
      {/* <section>
        <CategoryCreation
          isCategoryCreationSectionOpen={isCategoryCreationSectionOpen}
          setIsCategoryCreationSectionOpen={setIsCategoryCreationSectionOpen}
        />
      </section> */}
    </section>
  );
}
