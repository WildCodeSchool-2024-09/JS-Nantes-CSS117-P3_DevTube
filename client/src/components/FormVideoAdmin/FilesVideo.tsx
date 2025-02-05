import type { FilesVideoProps } from "../../types/FilesVideoProps";

export default function FilesVideo({ videoToUpdate }: FilesVideoProps) {
  return (
    <>
      <section>
        <img
          src={`${import.meta.env.VITE_API_URL}${videoToUpdate?.preview_image}`}
          alt="The preview of the video."
        />
        <label htmlFor="preview_image">Current preview image</label>
        <input
          type="file"
          id="preview_image"
          name="preview_image"
          accept="image/png, image/jpeg"
        />
      </section>
      <section>
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
    </>
  );
}
