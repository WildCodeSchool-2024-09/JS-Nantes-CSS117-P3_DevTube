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

  const returnClick = () => {
    setIsCategoryCreationSectionOpen(!isCategoryCreationSectionOpen);
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
          Create a video
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
            <button type="submit">Add</button>
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
