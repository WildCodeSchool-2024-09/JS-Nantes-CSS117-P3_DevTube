import { useState } from "react";
import "../../styles/testimonial.css";
import { useEffect } from "react";
import useToast from "../../utils/useToastify";

export default function Testimonials() {
  const { notifySuccess, notifyError } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [testimonialText, setTestimonialText] = useState("");
  const [user] = useState({ id: 1, is: "user_1" });
  const [testimonials, setTestimonials] = useState<testimonialText[]>([]);

  interface testimonialText {
    email: string;
    text_testimonial: string;
    firstname: string;
    lastname: string;
    level: number;
    profil_img: string;
  }
  const handleAddTestimonialClick = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTextChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTestimonialText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!testimonialText.trim()) {
      notifyError("Please write a testimonial.");
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
        fetch(`${import.meta.env.VITE_API_URL}/api/testimonial`)
          .then((response) => response.json())
          .then((data) => setTestimonials(data));

        notifySuccess("Thank you for trusting us");
        setShowModal(!showModal);
      } else {
        notifyError("Failed to add testimonial.");
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      notifyError("An error occurred while submitting the testimonial.");
    }
  };
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/testimonial`)
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .then((data) => console.warn(data));
  }, []);

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
            <section>
              <form className="form-testimonial" onSubmit={handleSubmit}>
                <label id="text" htmlFor="text">
                  Your comment
                </label>
                <textarea
                  name="testimonial"
                  className="comment-user"
                  placeholder="Enter your testimonial"
                  value={testimonialText}
                  onChange={handleTextChange}
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
          <section className="testimonial-container ">
            {testimonials?.map((el) => {
              return (
                <section key={el.email}>
                  <div className="testimonials-cards">
                    <article className="testimonial-card">
                      <div className="back-of">
                        <img
                          className="testimonial-image"
                          src={`${import.meta.env.VITE_API_URL}/${el.profil_img}`}
                          alt="presentation of the person giving the testimonial"
                        />
                      </div>
                      <section className="testimonial-info">
                        <header className="testimonial-header">
                          <div className="testimonial-name">
                            <p>
                              {el.firstname}
                              {el.lastname}
                            </p>
                          </div>
                          <div className="testimonial-formation">
                            <h2 className="formation">Formation suivie</h2>
                            <p className="level">{el.level}</p>
                          </div>
                        </header>

                        <p>{el.text_testimonial}</p>
                      </section>
                    </article>
                  </div>
                </section>
              );
            })}
          </section>
        </div>
      </div>
    </div>
  );
}
