export default function FormVideoAdmin() {
  return (
    <>
      <form className="form-admin">
        <fieldset>
          <legend>Video manager</legend>

          <label htmlFor="search-user-by-email">Search a video by name</label>
          <input
            className="search-admin"
            type="search"
            id="search-user-by-email"
            name="search-user-by-email"
            placeholder="Type the title of the video."
            // onChange={handleSearchOnChange}
          />
        </fieldset>

        <fieldset>
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

        <section className="admin-btn-wrapper">
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
        </section>
      </form>
    </>
  );
}
