import { NavLink } from "react-router-dom";
import "../../styles/Admin.css";

export default function Admin() {
  return (
    <>
      <h1 className="h1-admin">Administration</h1>
      <section className="form-admin-page">
        <NavLink to={"/admin-user-manager"}>User manager</NavLink>
        <NavLink to={"/admin-video-manager"}>Video manager</NavLink>
      </section>
    </>
  );
}
