import { NavLink, useOutletContext } from "react-router-dom";
import FilesVideo from "../../components/FormVideoAdmin/FilesVideo";
import InfoVideoToUpdate from "../../components/FormVideoAdmin/InfoVideoToUpdate";
import SearchVideoByCategory from "../../components/FormVideoAdmin/SearchVideoByCategory";
import type { OutletContextVideoManagerProps } from "../../types/outletContextVideoManager";

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
            <NavLink to="/admin/video-manager" className="standard-button">
              Return
            </NavLink>
          </section>
        </div>
      </section>
    </>
  );
}
