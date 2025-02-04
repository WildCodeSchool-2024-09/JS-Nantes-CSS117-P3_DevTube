import { NavLink } from "react-router-dom";
import "../../styles/Admin.css";

export default function Admin() {
  return (
    <div className="admin-page">
      <h1 className="title-admin">Administration</h1>
      <section className="button-admin-wrapper">
        <NavLink className="admin-link" to={"/admin-user-manager"}>
          User manager
        </NavLink>
        <NavLink className="admin-link" to={"/admin-video-manager"}>
          Video manager
        </NavLink>
      </section>
    </div>
  );
}
