import { useEffect, useState } from "react";
import type { User } from "../../../../server/src/modules/user/user.d";
import "../../styles/FormUserAdmin.css";
import { useSetFocus } from "../../utils/useSetFocus";

export default function FormUserAdmin() {
  const focusInSearch = useSetFocus<HTMLInputElement>();

  /*TODO Refactoring en cours*/
  // const [imgSrc, setImageSrc] = useState<string>();
  const [dataUser, setDataUser] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  const handleDragOver = (e: React.DragEvent<HTMLScriptElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLScriptElement>) => {
    e.preventDefault();
    const newImage = e.dataTransfer.files[0];
    if (newImage.type.startsWith("image/")) {
      const reader = new FileReader();
      // reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(newImage);
    }
  };

  // Fetch users when the search field is filled.
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "GET",
          },
        );
        const users = await response.json();
        setDataUser(users);
      } catch (err) {
        console.error(err);
      }
    };
    getAllUsers();
    if (!selectedUser) return;
  }, [selectedUser]);

  // Update setSelectedUser
  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value.toLowerCase();
    const findUserByEmail = dataUser?.find((user) =>
      user.email.includes(input),
    );

    if (input === "") {
      setSelectedUser(undefined);
      return;
    }

    if (input.length < 3) return;

    setSelectedUser(findUserByEmail);
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
  const handleUpdateUser = () => {
    console.warn("coucou");
  };
  const handleDeleteUser = () => {
    if (selectedUser) {
    } else {
    }
  };

  return (
    <>
      <form className="form-admin-wrapper form-admin">
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
            onChange={handleSearchOnChange}
          />
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
            defaultValue={(convertRegistrationDate as string) || ""}
            aria-labelledby="publication-date"
            required
          />
        </fieldset>

        <section
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="section-img-wrapper"
        >
          <img
            src={`${import.meta.env.VITE_API_URL}${selectedUser?.profil_img}`}
            alt="The user's profil avatar"
          />
        </section>

        <section className="admin-btn-wrapper">
          <button
            type="button"
            onClick={handleUpdateUser}
            className="btntTtest standard-button"
          >
            Update
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
