import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import type { Video } from "../../types/video";

export default function AdminVideoManager() {
  const [videoToUpdate, setVideoToUpdate] = useState<Video>();
  return (
    <section className="video-manager-page">
      <NavLink to={"./update-delete-video"} className="admin-link">
        "Update or Delete"
      </NavLink>
      <NavLink to={"./add-video"} className="admin-link">
        Add a video
      </NavLink>
      <NavLink to={"./create-category"} className="admin-link">
        Create a category
      </NavLink>

      <Outlet context={{ videoToUpdate, setVideoToUpdate }} />
    </section>
  );
}
