import { useEffect, useState } from "react";
import type { User } from "../../../../server/src/modules/user/user.d";
import "../../styles/FormUserAdmin.css";

export default function FormUserAdmin() {
  /*TODO Refactoring en cours*/
  // const [imgSrc, setImageSrc] = useState<string>();
  const [data, setData] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
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
        setData(users);
      } catch (err) {
        console.error(err);
      }
    };

    getAllUsers();
  }, []);
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userSelected = e.currentTarget.value;
    const currentCurrent = data?.find((user) => user.email === userSelected);
    setSelectedUser(currentCurrent);
    console.table(selectedUser);
  };
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
  return (
    <>
      <h3>User manager</h3>
      <form action="">
        <fieldset className="">
          <legend>User manager</legend>

          <label htmlFor="search-user-by-email">Search a user</label>
          <input
            className="search-admin"
            type="search"
            id="search-user-by-email"
            name="search-user-by-email"
            placeholder="Search a user by email."
          />
        </fieldset>
      </form>

      <fieldset className="">
        <legend>Main information about user</legend>

        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={selectedUser?.firstname || ""}
        />

        <label id="lastname" htmlFor="lastname">
          Last name
        </label>
        <input
          type="text"
          name="lastname"
          defaultValue={selectedUser?.lastname || ""}
          aria-labelledby="lastname"
          required
        />
      </fieldset>

      <fieldset className="">
        <label htmlFor="add-hero-slider">Is admin ?</label>
        <input
          type="checkbox"
          defaultChecked={selectedUser?.is_admin || false}
          id="add-hero-slider"
          name="add-hero-slider"
        />
      </fieldset>

      <fieldset className="">
        <label id="subscription-date" htmlFor="subscription-date">
          Subscription date
        </label>
        <input
          type="text"
          name="publication-date"
          defaultValue={selectedUser?.register_date || ""}
          aria-labelledby="publication-date"
          required
        />
      </fieldset>

      <fieldset className="">
        <label id="email" htmlFor="email">
          Email
        </label>
        <select
          onChange={handleSelectChange}
          id="user-select"
          name="user"
          required
          aria-required="true"
          defaultValue=""
        >
          <option value="" disabled>
            -- Select a user --
          </option>
          {data?.map((e) => (
            <option key={e.id} value={e.email}>
              {e.email}
            </option>
          ))}
        </select>

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

        <section
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="fiedlset-img-wrapper"
        >
          <img
            className="fieldset-thumb-loader"
            src={`${import.meta.env.VITE_API_URL}${selectedUser?.profil_img}`}
            alt="Load the video avatar here"
          />
        </section>

        <button type="button" className="standard-button">
          Update
        </button>
        <button type="button" className="standard-button">
          Delete
        </button>
      </fieldset>
    </>
  );
}
