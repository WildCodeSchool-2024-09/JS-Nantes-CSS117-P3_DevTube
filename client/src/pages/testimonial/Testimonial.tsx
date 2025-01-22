import { useState } from "react";
import "../../styles/testimonial.css";

export default function Testimonials() {
  const [showModal, setShowModal] = useState(false);
  const [testimonialText, setTestimonialText] = useState("");
  const [user] = useState({ id: 1, is: "user_1" });

  const handleAddTestimonialClick = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //setTestimonialText(event.target.value);
  //};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!testimonialText.trim()) {
      alert("Please write a testimonial.");
      return;
    }

    const formData = {
      user_id: user.id,
      text_testimonial: testimonialText,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/testimonial`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (res.ok) {
        alert("Testimonial added successfully!");
        setTestimonialText("");
        handleCloseModal();
      } else {
        alert("Failed to add testimonial.");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      alert("An error occurred while submitting the testimonial.");
    }
  };

  return (
    <div className="card-container">
      <div>
        <div className="testimonials-section">
          <header className="testimonials-header">
            <h1>Testimonials</h1>
            <button
              type="button"
              className="add-testimonial-btn"
              aria-label="Add your testimonial"
              onClick={handleAddTestimonialClick}
            >
              Add my testimonial
            </button>
          </header>

          {showModal && (
            <section className="formulaire-testimonial">
              <form onSubmit={handleSubmit}>
                <label id="text" htmlFor="text">
                  Your comment
                </label>
                <textarea
                  name="testimonial"
                  className="commentaire-user"
                  placeholder="Enter your testimonial"
                  value={testimonialText}
                  //	onChange={handleTextChange}
                />
                <button
                  type="submit"
                  className="add-testimonial-btn"
                  aria-label="Submit your testimonial"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </form>
            </section>
          )}

          <section className="testimonial-container">
            <div className="testimonials-cards">
              <article className="testimonial-card">
                <div className="back-of">
                  <img
                    className="testimonial-image"
                    src="5097224.jpg"
                    alt="presentation of the person giving the testimonial"
                  />
                </div>

                <section className="testimonial-info">
                  <header className="testimonial-header">
                    <div className="testimonial-name">
                      <p>John Doe</p>
                    </div>
                    <div className="testimonial-formation">
                      <h2 className="formation">Formation suivie</h2>
                      <p className="level">| Niveau avancé</p>
                    </div>
                  </header>

                  <p>
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit..." "There is no one who
                    loves pain itself, who seeks after it and wants to have it,
                    simply because it is pain..."
                  </p>
                </section>
              </article>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
