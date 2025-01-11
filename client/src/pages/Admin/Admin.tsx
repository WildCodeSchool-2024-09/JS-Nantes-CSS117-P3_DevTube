import { useState } from "react";
import "../../styles/Admin.css";

export default function Admin() {
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
  return (
    <section className="section-video-manager-container">
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
            name="dedscription"
            id="dedscription"
            placeholder="Enter your description here..."
          />

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
              <p className="fieldset-paragraph-loader">Drag an image here</p>
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
  );
}
