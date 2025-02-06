import { NavLink, useOutletContext } from "react-router-dom";
import FilesVideo from "../../components/FormVideoAdmin/FilesVideo";
import InfoVideoToUpdate from "../../components/FormVideoAdmin/InfoVideoToUpdate";
import SearchVideoByCategory from "../../components/FormVideoAdmin/SearchVideoByCategory";
import type { OutletContextVideoManagerProps } from "../../types/outletContextVideoManager";
import useToast from "../../utils/useToastify";

export default function UpdateDeleteVideo() {
  const outletContext = useOutletContext<OutletContextVideoManagerProps>();
  const { notifyError, notifySuccess } = useToast();

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
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  return (
    <>
      <section className="video-manager-wrapper">
        <h2 className="title-video-manager">
          Video manager - Update or Delete a video
        </h2>
        <SearchVideoByCategory />
        <div className={outletContext.isInfoVideoOpen ? "" : "hidden"}>
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
            <NavLink to="/admin/video-manager" className="standard-button">
              Return
            </NavLink>
          </section>
        </div>
      </section>
    </>
  );
}
