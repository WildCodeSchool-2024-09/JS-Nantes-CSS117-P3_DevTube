import { useRef, useState } from "react";
import type { User } from "../../../../server/src/modules/user/user.d";
import "../../styles/FormUserAdmin.css";
import { useSetFocus } from "../../utils/useSetFocus";
import useToast from "../../utils/useToastify";

export default function FormUserAdmin() {
  const focusInSearch = useSetFocus<HTMLInputElement>();
  const { notifySuccess, notifyError } = useToast();

  /*TODO Refactoring en cours*/
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [waitEmail, setWaitEmail] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);

  // Empties the user form fields if the search bar is empty.
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setSelectedUser(undefined);
      setWaitEmail("");
      return;
    }
    setWaitEmail(e.target.value);
  };

  // Update setSelectedUser
  const handleSearchClick = async () => {
    if (!waitEmail) {
      setSelectedUser(undefined);
      formRef.current?.reset();
      notifyError("Please fill in the field above.");
      return;
    }

    try {
      const input = waitEmail.toLowerCase();
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/email/${input}`,
        { method: "GET" },
      );

      if (!response.ok) {
        throw new Error("The user has not been found.");
      }

      const user = await response.json();

      if (!user.profil_img) {
        user.profil_img = "/assets/images/userprofil/avatar/user_profile.png";
      }

      setSelectedUser(user);
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  // Updates the `is_admin` property of the selected user
  const updateUserAdminStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedAdmin = e.target.checked;
    setSelectedUser((user) =>
      user
        ? {
            ...user,
            is_admin: checkedAdmin,
          }
        : user,
    );
  };

  // Date converter to locale date string
  const convertRegistrationDate: Date | string = selectedUser?.register_date
    ? new Date(selectedUser?.register_date).toLocaleDateString("fr-FR")
    : "";

  const downloadAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const getAllUsers = await fetch(
        `${import.meta.env.VITE_API_URL}/api/download/users`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!getAllUsers.ok) {
        throw new Error("Your file could not be downloaded.");
      }

      window.location.href = `${import.meta.env.VITE_API_URL}/api/download/users`;

      notifySuccess("The file has been downloaded.");
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users?email=${waitEmail}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("An unknown error occurred.");
      }

      setSelectedUser(undefined);
      formRef.current?.reset();
      notifySuccess(`The user ${waitEmail} has been removed.`);
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  return (
    <>
      <form ref={formRef} className="form-admin-wrapper form-admin">
        <fieldset>
          <legend>User manager</legend>

          <label htmlFor="search-user-by-email">Search a user by email</label>
          <input
            ref={focusInSearch}
            className="search-admin"
            type="search"
            id="search-user-by-email"
            name="search-user-by-email"
            placeholder="Type the user's email."
            onChange={handleOnChange}
          />
          <button
            type="button"
            id="search-user-by-email"
            className="standard-button"
            onClick={handleSearchClick}
          >
            Click to search for the user
          </button>
        </fieldset>
        <fieldset>
          <legend>Main information about user</legend>

          <label htmlFor="username">First name</label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={selectedUser?.firstname || ""}
            required
          />

          <label id="lastname" htmlFor="lastname">
            Last name
          </label>
          <input
            type="text"
            name="lastname"
            defaultValue={selectedUser?.lastname || ""}
            required
          />

          <label id="email" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            name="email"
            defaultValue={selectedUser?.email || ""}
            required
          />

          <label id="level" htmlFor="level">
            Level
          </label>
          <input
            type="level"
            defaultValue={selectedUser?.level || ""}
            name="level"
            aria-labelledby="level"
            required
          />

          <label htmlFor="user-is-admin" className="admin-label-wrapper">
            Check the box if the user is an administrator
            <input
              type="checkbox"
              checked={selectedUser?.is_admin || false}
              onChange={updateUserAdminStatus}
              id="user-is-admin"
              name="user-is-admin"
              className="admin-check-box"
              required
            />
          </label>
        </fieldset>

        <fieldset>
          <label id="subscription-date" htmlFor="subscription-date">
            Subscription date
          </label>
          <input
            type="text"
            name="publication-date"
            defaultValue={convertRegistrationDate as string}
            aria-labelledby="publication-date"
            required
          />
        </fieldset>

        <section className="section-img-wrapper">
          <img
            src={
              selectedUser?.profil_img
                ? `${import.meta.env.VITE_API_URL}/${selectedUser.profil_img}`
                : `${import.meta.env.VITE_API_URL}/assets/images/userprofil/avatar/user_profile.png`
            }
            alt="The user's profil avatar"
          />
        </section>

        <section className="admin-btn-wrapper">
          <button
            type="button"
            onClick={downloadAllUsers}
            className="btntTtest standard-button"
          >
            Download users as a csv file
          </button>
          <button
            type="button"
            onClick={handleDeleteUser}
            className="btntTtest standard-button"
          >
            Delete
          </button>
        </section>
      </form>
    </>
  );
}
