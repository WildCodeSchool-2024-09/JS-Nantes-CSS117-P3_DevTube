import { NavLink } from "react-router-dom";

export default function AdminVideoManager() {
  return (
    <section className="video-manager-page">
      <NavLink to={"/update-delete-video"} className="admin-link">
        "Update or Delete"
      </NavLink>
      <NavLink to={"/add-video"} className="admin-link">
        Add a video
      </NavLink>
      <NavLink to={"/create-category"} className="admin-link">
        Create a category
      </NavLink>
    </section>
  );
}
