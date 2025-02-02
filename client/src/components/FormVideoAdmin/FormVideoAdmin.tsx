import { useState } from "react";
import "../../styles/FormVideoManager.css";
// import type { Video } from "../../types/video";

export default function FormVideoAdmin() {
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  // const [videos, setVideos] = useState<Video[]>();

  //  useEffect(() => {
  //       const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${idOfTheCategoryLanguage}`;
  //       recoverInfoVideos(urlForVideos);
  //       }
  //     }
  //   }, [category]);

  // const sortCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const inputValue = event.target.value;
  //   if (inputValue) {
  //     const newCategories = videos.filter((video) => {
  //       const categoriesToFind = category.name.includes(
  //         inputValue.toLowerCase(),
  //       );
  //       return categoriesToFind;
  //     });
  //     setCategory(newCategories);
  //   } else {
  //     setCategory(Categories);
  //   }
  // };

  return (
    <div className="video-manager-wrapper">
      <form className="form-admin-wrapper ">
        <h2>Video manager</h2>
        <button
          type="button"
          onClick={() => setSearchBarOpen(!isSearchBarOpen)}
          className="btntTtest standard-button"
        >
          {isSearchBarOpen
            ? "Hide search bar"
            : "I want to update or delete a video"}
        </button>

        <fieldset className={isSearchBarOpen ? "" : "hidden"}>
          {/* <label htmlFor="search-user-by-email">
            Search a video by category
          </label>
          <input
            className="search-admin"
            type="search"
            id="search-video-by-category"
            name="search-video-by-category"
            placeholder="Type the category language of the video."
            onChange={(event) => sortCategory(event)}
          /> */}
          <label htmlFor="category-select">Choose a pet:</label>

          <select name="categories" id="category-select">
            <option value="">
              --Please choose a category language of videos--
            </option>
            <option value="1">HTML</option>
            <option value="2">CSS</option>
            <option value="3">Algo</option>
            <option value="4">Javascript</option>
            <option value="5">Node.js</option>
            <option value="6">REACT</option>
            <option value="7">github</option>
            <option value="8">SQL</option>
            <option value="9">EXPRESS</option>
          </select>
        </fieldset>

        {/* <fieldset>
          <legend>Main information video</legend>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            // defaultValue={selectedUser?.firstname || ""}
            required
          />
          <label id="publication-date" htmlFor="publication-date">
            Publication date
          </label>
          <input
            type="text"
            name="publication-date"
            // defaultValue={selectedUser?.lastname || ""}
            required
          />
          <label id="duration" htmlFor="duration">
            Duration
          </label>
          <input
            type="text"
            name="duration"
            // defaultValue={selectedUser?.email || ""}
            required
          />
          <label id="description" htmlFor="description">
            Description
          </label>
          <textarea
            // defaultValue={selectedUser?.level || ""}
            name="description"
            maxLength={255}
            placeholder="Enter your description here..."
            aria-labelledby="description"
            required
          />
          <label htmlFor="add-hero-slider" className="admin-label-wrapper">
            Add in hero slider
            <input
              type="checkbox"
              // checked={selectedUser?.is_admin || false}
              // onChange={updateUserAdminStatus}
              id="add-hero-slider"
              name="add-hero-slider"
              className="admin-check-box"
            />
          </label>
          <label id="category-title" htmlFor="category-title">
            Title of the catergory
          </label>
          <input
            type="text"
            name="category-title"
            readOnly
            aria-labelledby="category-title"
            required
          />
          <label id="newcategory" htmlFor="newcategory">
            Select a new catergory
          </label>{" "}
          <select name="" id="">
            <option value="">Front-end</option>
            <option value="">Back-end</option>
            <option value="">Bases</option>
          </select>
        </fieldset>

        <section
          // onDragOver={handleDragOver}
          // onDrop={handleDrop}
          className="section-img-wrapper"
        >
          <img
            src="" //{`${import.meta.env.VITE_API_URL}${selectedUser?.profil_img}`}
            alt="The thumbnail of the video."
          />
        </section>
        {/* 
        <fieldset>
          <label id="subscription-date" htmlFor="subscription-date">
            Subscription date
          </label>
          <input
            type="text"
            name="publication-date"
            defaultValue="" //{(convertRegistrationDate as string) || ""}
            aria-labelledby="publication-date"
            required
          />
        </fieldset> */}

        {/* <section className="admin-btn-wrapper">
          <button
            type="button"
            // onClick={handleUpdateUser}
            className="btntTtest standard-button"
          >
            New
          </button>
          <button
            type="button"
            // onClick={handleUpdateUser}
            className="btntTtest standard-button"
          >
            Update
          </button>
          <button
            type="button"
            // onClick={handleDeleteUser}
            className="btntTtest standard-button"
          >
            Delete
          </button>
        </section> */}
      </form>
    </div>
  );
}
