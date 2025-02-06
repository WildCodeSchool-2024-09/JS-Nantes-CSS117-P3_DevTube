import SearchVideoByCategory from "../../components/FormVideoAdmin/SearchVideoByCategory";
import { useOutletContext } from "react-router-dom";
import type { OutletContextVideoManagerProps } from "../../types/outletContextVideoManager";
import InfoVideoToUpdate from "../../components/FormVideoAdmin/InfoVideoToUpdate";
import FilesVideo from "../../components/FormVideoAdmin/FilesVideo";

export default function UpdateDeleteVideo() {
  const outletContext = useOutletContext<OutletContextVideoManagerProps>();

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
              // onClick={handleDeleteVideo}
              className="btntTtest standard-button"
            >
              Delete
            </button>
            <button
              type="button"
              className="standard-button"
              // onClick={returnClick}
            >
              Return
            </button>
          </section>
        </div>
      </section>
    </>
  );
}
