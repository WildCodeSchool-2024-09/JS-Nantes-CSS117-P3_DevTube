import { NavLink } from "react-router-dom";
import useToast from "../../utils/useToastify";
import "../../styles/CreateCategory.css";

export default function CreateCategory() {
  const { notifyError, notifySuccess } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

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
      notifySuccess(`The catgory ${data?.name} has been created.`);
    } catch (err) {
      notifyError((err as Error).message);
    }
  };

  return (
    <section className="create-category-page">
      <form onSubmit={handleSubmit} className="create-category-form">
        {/* <label htmlFor="name">Title</label> */}
        <input
          className="category-input"
          type="text"
          id="name"
          name="name"
          placeholder="Write a new videos category name"
          required
        />
        <button type="submit" className="big-cta">
          Add a category
        </button>
      </form>
      <NavLink
        type="button"
        className="standard-button return-button return-from-category-form"
        to={"/admin/video-manager"}
      >
        Return
      </NavLink>
    </section>
  );
}
