import { NavLink } from "react-router-dom";
import useToast from "../../utils/useToastify";
import "../../styles/AddVideoForm.css";

export default function AddVideo() {
  const { notifyError, notifySuccess } = useToast();

  const handleCreateVideo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    // console.log({ data });

    let previewImageToUpload: File | string = "";

    // Nouvelle image sélectionnée
    previewImageToUpload = data.preview_image;

    //TODO FIX BUG IMAGE BAD PATH IN THE FILE SYSTEM WHEN IT IS REGISTERED

    // On utilise formData.set pour remplacer la valeur
    formData.set("preview_image", previewImageToUpload);
    formData.set("is_heroSlide", data.is_heroSlide ? "1" : "0");
    formData.set("is_freemium", data.is_freemium ? "1" : "0");
    formData.set("is_popular", data.is_popular ? "1" : "0");
    formData.set("thumbnail", data.thumbnail);

    // TODO: Add 'thumbnail' in formData
    // thumbnail should be data.thumbnail || videoToUpdate?.thumbnail
    // It should be a File, so i'll probably have to fetch it as for preview_image if videoToUpdate?.thumbnail is a path

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error("An unknown error occurred.");
      }
      notifySuccess(`The video ${data.name} has been created.`);
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleCreateVideo} className="add-video-form">
      <fieldset className="main-info-video-wrapper">
        <legend>Main information video</legend>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label id="added_date" htmlFor="added_date">
          Publication date
        </label>
        <input type="text" name="added_date" required />
        <label id="duration" htmlFor="duration">
          Duration in minutes
        </label>
        <input type="text" name="duration" required />
        <label id="description" htmlFor="description">
          Description
        </label>
        <textarea
          name="description"
          style={{
            width: 300,
            height: 200,
          }}
          maxLength={255}
          aria-labelledby="description"
          required
        />
        <div className="hero-slider-choice">
          <label htmlFor="is_heroSlide" className="heroSlide-label-wrapper">
            Add in hero slider
            <input
              type="checkbox"
              id="is_heroSlide"
              name="is_heroSlide"
              className="admin-check-box"
            />
          </label>
        </div>
        <label htmlFor="is_freemium" className="is_freemium-label-wrapper">
          Freemium Video
          <input
            type="checkbox"
            id="is_freemium"
            name="is_freemium"
            className="admin-check-box"
          />
        </label>
        <label htmlFor="is_popular" className="is_popular-label-wrapper">
          Add in popular carousel
          <input
            type="checkbox"
            id="is_popular"
            name="is_popular"
            className="admin-check-box"
          />
        </label>
        <label id="category-title" htmlFor="category_id">
          Title of the catergory
        </label>
        <input
          type="text"
          name="category_id"
          id="category_id"
          readOnly
          required
        />
      </fieldset>
      <section className="preview-image-choice">
        <label htmlFor="preview_image">Choose a preview image</label>
        <input
          type="file"
          id="preview_image"
          name="preview_image"
          accept="image/png, image/jpeg"
        />
      </section>
      <section className="file-video-choice">
        <label htmlFor="thumbnail">Enter the file video :</label>
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          accept="video/*, .mp4"
        />
      </section>
      <section className="form-buttons-wrapper">
        <button type="submit" className="standard-button">
          Add
        </button>
        <NavLink
          to="/admin/video-manager"
          className="standard-button return-button-from-add-video"
        >
          Return
        </NavLink>
      </section>
    </form>
  );
}
