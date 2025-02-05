import useToast from "../../utils/useToastify";

interface CategoryCreationProps {
  isCategoryCreationSectionOpen: boolean;
  setIsCategoryCreationSectionOpen: (value: boolean) => void;
}

export default function CategoryCreation({
  isCategoryCreationSectionOpen,
  setIsCategoryCreationSectionOpen,
}: CategoryCreationProps) {
  const { notifyError, notifySuccess } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.warn(data);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      if (!response.ok) {
        throw new Error("An unknown error occurred.");
      }
      notifySuccess(`The catgory ${data?.name} has been updated.`);
      // setVideosSectionOpen(!isVideosSectionOpen);
      // setInfoVideoOpen(!isInfoVideoOpen);
    } catch (err) {
      notifyError((err as Error).message);
    }
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
          Create a category
        </button>
      )}
      {isCategoryCreationSectionOpen && (
        <section>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Title</label>
            <input
              type="text"
              id="name"
              name="name"
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
