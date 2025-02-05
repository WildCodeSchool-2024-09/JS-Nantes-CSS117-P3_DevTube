interface CategoryCreationProps {
  isCategoryCreationSectionOpen: boolean;
  setIsCategoryCreationSectionOpen: (value: boolean) => void;
}

export default function CategoryCreation({
  isCategoryCreationSectionOpen,
  setIsCategoryCreationSectionOpen,
}: CategoryCreationProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.warn(data);
  };

  const returnClick = async () => {
    setIsCategoryCreationSectionOpen(!isCategoryCreationSectionOpen);
    // try {
    //   // console.log({ data });
    //   const token = localStorage.getItem("token");
    //   const response = await fetch(
    //     `${import.meta.env.VITE_API_URL}/api/videos/${videoToUpdate?.id}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: formData,
    //     },
    //   );
    //   if (!response.ok) {
    //     throw new Error("An unknown error occurred.");
    //   }
    //   notifySuccess(`The video ${videoToUpdate?.name} has been updated.`);
    //   setVideosSectionOpen(!isVideosSectionOpen);
    //   setInfoVideoOpen(!isInfoVideoOpen);
    // } catch (err) {
    //   notifyError((err as Error).message);
    // }
  };

  return (
    <>
      {!isCategoryCreationSectionOpen && (
        <button
          type="button"
          className="admin-link"
          onClick={() =>
            setIsCategoryCreationSectionOpen(!isCategoryCreationSectionOpen)
          }
        >
          Create a category
        </button>
      )}
      {isCategoryCreationSectionOpen && (
        <section>
          <form onSubmit={handleSubmit}>
            <label htmlFor="new_category">Title</label>
            <input
              type="text"
              id="new_category"
              name="new_category"
              placeholder="Write a new videos category name"
              required
            />
            <button type="submit" className="big-cta">
              Add
            </button>
          </form>
          <button
            type="button"
            className="standard-button"
            onClick={returnClick}
          >
            Return
          </button>
        </section>
      )}
    </>
  );
}
