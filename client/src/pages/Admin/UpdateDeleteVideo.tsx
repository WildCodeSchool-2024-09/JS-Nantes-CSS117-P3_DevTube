import { NavLink, useOutletContext } from "react-router-dom";
import FilesVideo from "../../components/FormVideoAdmin/FilesVideo";
import InfoVideoToUpdate from "../../components/FormVideoAdmin/InfoVideoToUpdate";
import SearchVideoByCategory from "../../components/FormVideoAdmin/SearchVideoByCategory";
import type { OutletContextVideoManagerProps } from "../../types/outletContextVideoManager";
import useToast from "../../utils/useToastify";

export default function UpdateDeleteVideo() {
  const outletContext = useOutletContext<OutletContextVideoManagerProps>();
  const { notifyError, notifySuccess } = useToast();

  const handleUpdateVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    let previewImageToUpload: File | string = "";

    if (data.preview_image instanceof File) {
      // Nouvelle image sélectionnée
      previewImageToUpload = data.preview_image;
    } else if (
      outletContext.videoToUpdate?.preview_image &&
      !data.preview_image
    ) {
      // On créé un File a partir du chemin de l'image :
      // (on la charge avec fetch puis on prend le blob qui est retourné pour le transformer en File)
      const currentPreviewImageFileName =
        outletContext.videoToUpdate?.preview_image.split("/")[
          outletContext.videoToUpdate?.preview_image.split("/").length - 1
        ] as string;

      const currentPreviewImageAsAFile = await fetch(
        `${import.meta.env.VITE_API_URL}${outletContext.videoToUpdate?.preview_image}`,
      ).then(async (response) => {
        const blob = await response.blob();

        const file = new File([blob], currentPreviewImageFileName);
        return file;
      });
      // Image existante conservée
      previewImageToUpload = currentPreviewImageAsAFile; // Envoyer le chemin existant
    }
    //TODO FIX BUG IMAGE BAD PATH IN THE FILE SYSTEM WHEN IT IS REGISTERED

    // On utilise formData.set pour remplacer la valeur
    formData.set("preview_image", previewImageToUpload);
    formData.set("is_heroSlide", data.is_heroSlide ? "1" : "0");
    formData.set("is_freemium", data.is_freemium ? "1" : "0");
    formData.set("is_popular", data.is_popular ? "1" : "0");
    formData.set("thumbnail", data.thumbnail);
    formData.set("added_date", (data.added_date as string)?.substring(0, 10));

    // TODO: Add 'thumbnail' in formData
    // thumbnail should be data.thumbnail || videoToUpdate?.thumbnail
    // It should be a File, so i'll probably have to fetch it as for preview_image if videoToUpdate?.thumbnail is a path

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${outletContext.videoToUpdate?.id}`,
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
      notifySuccess(
        `The video ${outletContext.videoToUpdate?.name} has been updated.`,
      );
      outletContext.setVideosSectionOpen(!outletContext.isVideosSectionOpen);
      outletContext.setInfoVideoOpen(!outletContext.isInfoVideoOpen);
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  const handleDeleteVideo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${outletContext.videoToUpdate?.id}`,
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
      notifySuccess(
        `The video ${outletContext.videoToUpdate?.name} has been removed.`,
      );
      outletContext.setVideosSectionOpen(!outletContext.isVideosSectionOpen);
      outletContext.setInfoVideoOpen(!outletContext.isInfoVideoOpen);
      outletContext.setNeedToRefetch(!outletContext.needToRefetch);
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  const closeSection = () => {
    outletContext.setInfoVideoOpen(!outletContext.isInfoVideoOpen);
    outletContext.setVideosSectionOpen(!outletContext.isVideosSectionOpen);
  };

  return (
    <>
      <section className="video-manager-wrapper">
        <h2 className="title-video-manager">Update or Delete a video</h2>
        <SearchVideoByCategory />
        <form
          className={outletContext.isInfoVideoOpen ? "" : "hidden"}
          onSubmit={handleUpdateVideo}
        >
          <InfoVideoToUpdate videoToUpdate={outletContext.videoToUpdate} />
          <FilesVideo videoToUpdate={outletContext.videoToUpdate} />
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
            <NavLink
              to="/admin/video-manager"
              className="standard-button"
              onClick={closeSection}
            >
              Return
            </NavLink>
          </section>
        </form>
      </section>
    </>
  );
}
