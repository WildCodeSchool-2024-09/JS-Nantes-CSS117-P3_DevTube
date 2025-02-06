import { NavLink, Outlet, useMatch } from "react-router-dom";
import "../../styles/Admin.css";

export default function Admin() {
  const match = useMatch("/admin"); // Match give the object routes in the parenthese if we are in this route during the navigation , otherwise, match returns null if it's not the case

  return (
    <div className="admin-page">
      <h1 className="title-admin">Administration</h1>
      <section className="button-admin-wrapper">
        {!!match && (
          <>
            <NavLink className="admin-link" to={"./user-manager"}>
              User manager
            </NavLink>
            <NavLink className="admin-link" to={"./video-manager"}>
              Video manager
            </NavLink>
          </>
        )}
        <Outlet />
      </section>
    </div>
  );
}
