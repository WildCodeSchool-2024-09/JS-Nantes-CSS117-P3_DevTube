import { useState } from "react";
import "../../styles/Admin.css";

export default function Admin() {
  // useState for drag the selected image
  const [imgSrc, setImageSrc] = useState<string>();

  const handleDragOver = (e: React.DragEvent<HTMLScriptElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLScriptElement>) => {
    e.preventDefault();
    const newImage = e.dataTransfer.files[0];
    if (newImage.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(newImage);
    }
  };

  // Example for hero slider
  const listThumbnails = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  return (
    <>
      <section className="section-video-manager-container">
        <h2>devtube Manager</h2>
        <fieldset className="fieldset-container fieldset-admin-wrapper">
          {/* Video manager */}
          <legend>Video manager</legend>

          <fieldset className="fieldset-container fieldset-admin-wrapper">
            {/* Main information */}
            <legend>Main information</legend>
            <section className="fiedlset-input-wrapper">
              <label id="title" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                aria-labelledby="title"
                placeholder="Enter the title of the video"
                required
              />
            </section>

            {/* Publication date */}
            <section className="fiedlset-input-wrapper">
              <label id="publication-date" htmlFor="publication-date">
                Publication date
              </label>
              <input
                type="text"
                name="publication-date"
                aria-labelledby="publication-date"
                placeholder="Enter the publication date"
                required
              />
            </section>

            {/* Duration */}
            <section className="fiedlset-input-wrapper">
              <label id="duration" htmlFor="duration">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                aria-labelledby="duration"
                placeholder="Enter the publication date"
                required
              />
            </section>

            {/* Video description */}
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter your description here..."
            />

            {/* Downloader */}
            <section className="add-file-wrapper">
              <input type="file" id="videoFile" accept="video/*" />
              <section className="check-wrapper">
                <label htmlFor="add-hero-slider">Add in hero slider</label>
                <input
                  type="checkbox"
                  id="add-hero-slider"
                  name="add-hero-slider"
                />
              </section>
            </section>

            {/* Thumbnail */}
            <section
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="fiedlset-img-wrapper"
            >
              {imgSrc ? (
                <img
                  className="fieldset-thumb-loader"
                  src={imgSrc}
                  alt="Load the video thumbnail here"
                />
              ) : (
                <p className="fieldset-paragraph-loader">
                  Drag a thumbnail for your video here
                </p>
              )}
            </section>
          </fieldset>

          {/* Category manager */}
          <fieldset className="fieldset-container">
            <legend>Category manager</legend>

            <section className="fiedlset-input-wrapper">
              <label id="newcategory" htmlFor="newcategory">
                Enter a new catergory
              </label>
              <input
                type="text"
                name="new-category"
                aria-labelledby="new-category"
                placeholder="Enter the title of the new category"
                required
              />
            </section>

            <section className="fiedlset-input-wrapper">
              <label id="category" htmlFor="category">
                Category
              </label>
              <select name="" id="">
                <option value="">Front-end</option>
                <option value="">Back-end</option>
                <option value="">Bases</option>
              </select>
            </section>
          </fieldset>

          {/* Questions manager */}
          <fieldset className="fieldset-container">
            <legend>Questions manager</legend>
            {/* Question 1 */}
            <section className="question-wrapper">
              <section className="title-wrapper">
                <p>Question 01</p>
                <section className="check-wrapper">
                  <label htmlFor="good-answer">True</label>
                  <input type="checkbox" id="good-answer" name="good-answer" />
                </section>
              </section>
              <input
                type="text"
                name="question-one"
                aria-labelledby="question-one"
                placeholder="Enter your question here..."
                required
              />
            </section>

            {/* Question 2 */}
            <section className="question-wrapper">
              <section className="title-wrapper">
                <p>Question 02</p>
                <section className="check-wrapper">
                  <label htmlFor="good-answer">True</label>
                  <input type="checkbox" id="good-answer" name="good-answer" />
                </section>
              </section>
              <input
                type="text"
                name="question-two"
                aria-labelledby="question-two"
                placeholder="Enter your question here..."
                required
              />
            </section>
          </fieldset>

          {/* buttons video manger */}
          <button type="button" className="btn-validation big-cta">
            New
          </button>
          <section className="fieldset-button">
            <button type="button" className="standard-button">
              Update
            </button>
            <button type="button" className="standard-button">
              Delete
            </button>
          </section>
        </fieldset>
      </section>

      <section className="section-hero-slider-container">
        {/* Hero slider */}
        <h3>Hero Slider</h3>
        <section className="hero-slider-wrapper">
          {listThumbnails.map((el) => (
            <img key={el.id} className="hero-slider-thumb" src="" alt="" />
          ))}
        </section>

        {/* Populars */}
        <h3>Populars</h3>
        <section className="hero-slider-wrapper">
          {listThumbnails.map((el) => (
            <img key={el.id} className="hero-slider-thumb" src="" alt="" />
          ))}
        </section>

        {/* News in */}
        <h3>News in</h3>
        <section className="hero-slider-wrapper">
          {listThumbnails.map((el) => (
            <img key={el.id} className="hero-slider-thumb" src="" alt="" />
          ))}
        </section>
      </section>

      {/* User manager */}
      <section className="section-video-manager-container">
        <h3>User manager</h3>
        <fieldset className="fieldset-container fieldset-admin-wrapper">
          {/* User manager */}
          <legend>User manager</legend>

          {/* Main information */}
          <legend>Main information</legend>

          {/* User name */}
          <section className="fiedlset-input-wrapper">
            <label id="username" htmlFor="username">
              User name
            </label>
            <input
              type="text"
              name="username"
              aria-labelledby="username"
              required
            />
          </section>

          {/* Last name */}
          <section className="fiedlset-input-wrapper">
            <label id="lastname" htmlFor="lastname">
              Last name
            </label>
            <input
              type="text"
              name="lastname"
              aria-labelledby="lastname"
              required
            />
          </section>

          <section className="check-wrapper">
            <label htmlFor="add-hero-slider">Is admin ?</label>
            <input
              type="checkbox"
              id="add-hero-slider"
              name="add-hero-slider"
            />
          </section>

          {/* Subscription date */}
          <section className="fiedlset-input-wrapper">
            <label id="subscription-date" htmlFor="subscription-date">
              Subscription date
            </label>
            <input
              type="text"
              name="publication-date"
              aria-labelledby="publication-date"
              required
            />
          </section>

          {/* Email */}
          <section className="fiedlset-input-wrapper">
            <label id="email" htmlFor="email">
              Email
            </label>
            <input type="email" name="email" aria-labelledby="email" required />
          </section>

          {/* Level */}
          <section className="fiedlset-input-wrapper">
            <label id="level" htmlFor="level">
              Level
            </label>
            <input type="level" name="level" aria-labelledby="level" required />
          </section>

          {/* Avatar */}
          <section
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="fiedlset-img-wrapper"
          >
            {imgSrc ? (
              <img
                className="fieldset-thumb-loader"
                src={imgSrc}
                alt="Load the video avatar here"
              />
            ) : (
              <p className="fieldset-paragraph-loader">Drag a avatar</p>
            )}
          </section>

          {/* buttons video manger */}
          <section className="fieldset-button">
            <button type="button" className="standard-button">
              Update
            </button>
            <button type="button" className="standard-button">
              Delete
            </button>
          </section>
        </fieldset>
      </section>
    </>
  );
}
