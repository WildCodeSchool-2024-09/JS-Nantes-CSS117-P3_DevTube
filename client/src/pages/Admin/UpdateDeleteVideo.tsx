import SearchVideoByCategory from "../../components/FormVideoAdmin/SearchVideoByCategory";

export default function UpdateDeleteVideo() {
  return (
    <>
      <section className="video-manager-wrapper">
        <h2 className="title-video-manager">
          Video manager - Update or Delete a video
        </h2>
        <SearchVideoByCategory />
      </section>
    </>
  );
}
