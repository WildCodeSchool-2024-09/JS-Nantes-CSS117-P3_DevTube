import type { Video } from "../../types/video";

interface FilesVideoProps {
  videoToUpdate: Video | undefined;
}
export default function FilesVideo({ videoToUpdate }: FilesVideoProps) {
  return (
    <div>
      <section className="preview-image-choice">
        <img
          className="preview-image"
          src={`${import.meta.env.VITE_API_URL}${videoToUpdate?.preview_image}`}
          alt="The preview of the video."
        />
        <label htmlFor="preview_image">Change the preview image</label>
        <input
          type="file"
          id="preview_image"
          name="preview_image"
          accept="image/png, image/jpeg"
        />
      </section>
      <section className="file-video-choice">
        <label htmlFor="thumbnail">
          Current file video : <span>{`${videoToUpdate?.thumbnail}`}</span>
        </label>
        <input
          type="file"
          id="thumbnail"
          name="thumbnail"
          accept="video/*, .mp4"
        />
      </section>
    </div>
  );
}
