import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import type { Video } from "../../types/video";
import "../../styles/FormVideoManager.css";

export default function AdminVideoManager() {
  const [videoToUpdate, setVideoToUpdate] = useState<Video>();
  const [isInfoVideoOpen, setInfoVideoOpen] = useState<boolean>(false); //Information of a video form
  const [isVideosSectionOpen, setVideosSectionOpen] = useState<boolean>(false); // dysplay or not all videos of the category choiced by the select
  const [needToRefetch, setNeedToRefetch] = useState<boolean>(false);

  return (
    <section className="video-manager-page">
      <NavLink to={"./update-delete-video"} className="admin-link">
        "Update or Delete"
        {/* onClick={updateChoice} */}
      </NavLink>
      <NavLink to={"./add-video"} className="admin-link">
        Add a video
      </NavLink>
      <NavLink to={"./create-category"} className="admin-link">
        Create a category
      </NavLink>

      <Outlet
        context={{
          videoToUpdate,
          setVideoToUpdate,
          isInfoVideoOpen,
          setInfoVideoOpen,
          isVideosSectionOpen,
          setVideosSectionOpen,
          needToRefetch,
          setNeedToRefetch,
        }}
      />
    </section>
  );
}
