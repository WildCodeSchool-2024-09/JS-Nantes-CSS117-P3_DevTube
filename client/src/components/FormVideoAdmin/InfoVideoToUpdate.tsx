import type { Video } from "../../types/video";

interface InfoVideoToUpdateProps {
  videoToUpdate: Video | undefined;
}

export default function InfoVideoToUpdate({
  videoToUpdate,
}: InfoVideoToUpdateProps) {
  return (
    <section>
      <fieldset className="main-info-video-wrapper">
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
              defaultChecked={videoToUpdate?.is_heroSlide === 1}
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
            defaultChecked={videoToUpdate?.is_freemium === 1}
            id="is_freemium"
            name="is_freemium"
            className="admin-check-box"
          />
        </label>
        <label htmlFor="is_popular" className="is_popular-label-wrapper">
          Add in popular carousel
          <input
            type="checkbox"
            defaultChecked={videoToUpdate?.is_popular === 1}
            id="is_popular"
            name="is_popular"
            className="admin-check-box"
          />
        </label>
        <label id="category-title" htmlFor="category_id">
          Title of the catergory
        </label>
        <input
          defaultValue={videoToUpdate?.category_id}
          type="text"
          name="category_id"
          id="category_id"
          readOnly
          required
        />
      </fieldset>
    </section>
  );
}
