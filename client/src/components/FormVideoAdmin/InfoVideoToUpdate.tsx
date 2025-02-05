import type { Video } from "../../types/video";

interface InfoVideoToUpdateProps {
  isInfoVideoOpen: boolean;
  videoToUpdate: Video | undefined;
}

export default function InfoVideoToUpdate({
  isInfoVideoOpen,
  videoToUpdate,
}: InfoVideoToUpdateProps) {
  return (
    <section className={isInfoVideoOpen ? "" : "hidden"}>
      <fieldset>
        <legend>Main information video</legend>
        <label htmlFor="name">Title</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={videoToUpdate?.name}
          required
        />
        <label id="added_date" htmlFor="added_date">
          Publication date
        </label>
        <input
          type="text"
          name="added_date"
          defaultValue={videoToUpdate?.added_date}
          required
        />
        <label id="duration" htmlFor="duration">
          Duration
        </label>
        <input
          type="text"
          name="duration"
          defaultValue={videoToUpdate?.duration}
          required
        />
        <label id="description" htmlFor="description">
          Description
        </label>
        <textarea
          defaultValue={videoToUpdate?.description}
          name="description"
          maxLength={255}
          aria-labelledby="description"
          required
        />
        <label htmlFor="is_heroSlide" className="heroSlide-label-wrapper">
          Add in hero slider
          <input
            type="checkbox"
            defaultChecked={videoToUpdate?.is_heroSlide === 1}
            id="is_heroSlide"
            name="is_heroSlide"
            className="admin-check-box"
          />
        </label>
        <label htmlFor="is_freemium" className="is_freemium-label-wrapper">
          Freemium Video
          <input
            type="checkbox"
            defaultChecked={videoToUpdate?.is_freemium === 1}
            id="is_freemium"
            name="is_freemium"
            className="admin-check-box"
          />
        </label>
        <label htmlFor="is_popular" className="s_popular-label-wrapper">
          Add in popular carousel
          <input
            type="checkbox"
            defaultChecked={videoToUpdate?.is_popular === 1}
            id="is_popular"
            name="is_popular"
            className="admin-check-box"
          />
        </label>
        <label id="category-title" htmlFor="category-title">
          Title of the catergory
        </label>
        <input
          defaultValue={videoToUpdate?.category_id}
          type="text"
          name="category-id"
          readOnly
          aria-labelledby="category-id"
          required
        />
      </fieldset>
    </section>
  );
}
