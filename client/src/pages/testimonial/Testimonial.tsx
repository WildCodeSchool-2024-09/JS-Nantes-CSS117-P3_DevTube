import { useState } from "react";
import "../../styles/testimonial.css";
export default function Testimonials() {
  const [showmodel, setSowmodel] = useState(false);

  const hadalclick = () => {
    setSowmodel(!showmodel);
  };
  const hadalclick2 = () => {
    setSowmodel(false);
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
              onClick={hadalclick}
            >
              Add my testimonial
            </button>
          </header>
          {showmodel && (
            <section className="formulaire-testimonial ">
              <form action="">
                <label id="text" htmlFor="text">
                  Your commentair
                </label>
                <input
                  type="text"
                  name="name"
                  className="commentaire-user"
                  placeholder="Enter your commentair"
                />
              </form>
              <button
                type="button"
                className="add-testimonial-btn"
                aria-label="Add your testimonial"
                onClick={hadalclick2}
              >
                validation
              </button>
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
            <div className="testimonials-cards">
              <article className="testimonial-card">
                <div className="back-of">
                  <img
                    className="testimonial-image"
                    src="5097224.jpg"
                    alt="prisentation of the person giving the testimonial"
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit obcaecati id neque pariatur veniam atque possimus
                    rerum iusto aperiam error.
                  </p>
                </section>
              </article>
            </div>
            <div className="testimonials-cards">
              <article className="testimonial-card">
                <div className="back-of">
                  <img
                    className="testimonial-image"
                    src="5097224.jpg"
                    alt="prisentation of the person giving the testimonial"
                  />
                </div>

                <section className="testimonial-info">
                  <header className="testimonial-header">
                    <div className="testimonial-name">
                      <p className="name">John Doe</p>
                    </div>
                    <div className="testimonial-formation">
                      <h2 className="formation">Formation suivie</h2>
                      <p className="level">| Niveau avancé</p>
                    </div>
                  </header>

                  <p className="testimonial-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit obcaecati id neque pariatur veniam atque possimus
                    rerum iusto aperiam error.
                  </p>
                </section>
              </article>
            </div>
            <div className="testimonials-cards">
              <article className="testimonial-card">
                <div className="back-of">
                  <img
                    className="testimonial-image"
                    src="5097224.jpg"
                    alt="praisentation of the person giving the testimonial"
                  />
                </div>

                <section className="testimonial-info">
                  <header className="testimonial-header">
                    <div className="testimonial-name">
                      <p className="name">John Doe</p>
                    </div>
                    <div className="testimonial-formation">
                      <h2 className="formation">Formation suivie</h2>
                      <p className="level">| Niveau avancé</p>
                    </div>
                  </header>

                  <p className="testimonial-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit obcaecati id neque pariatur veniam atque possimus
                    rerum iusto aperiam error.
                  </p>
                </section>
              </article>
            </div>

            <div className="testimonials-cards">
              <article className="testimonial-card">
                <div className="back-of">
                  <img
                    className="testimonial-image"
                    src="5097224.jpg"
                    alt="prisentation of the person giving the testimonial"
                  />
                </div>

                <section className="testimonial-info">
                  <header className="testimonial-header">
                    <div className="testimonial-name">
                      <p className="name">John Doe</p>
                    </div>
                    <div className="testimonial-formation">
                      <h2 className="formation">Formation suivie</h2>
                      <p className="level">| Niveau avancé</p>
                    </div>
                  </header>

                  <p className="testimonial-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit obcaecati id neque pariatur veniam atque possimus
                    rerum iusto aperiam error.
                  </p>
                </section>
              </article>
            </div>
            <div className="testimonials-cards">
              <article className="testimonial-card">
                <div className="back-of">
                  <img
                    className="testimonial-image"
                    src="5097224.jpg"
                    alt="prisentation of the person giving the testimonial"
                  />
                </div>

                <section className="testimonial-info">
                  <header className="testimonial-header">
                    <div className="testimonial-name">
                      <p className="name">John Doe</p>
                    </div>
                    <div className="testimonial-formation">
                      <h2 className="formation">Formation suivie</h2>
                      <p className="level">| Niveau avancé</p>
                    </div>
                  </header>

                  <p className="testimonial-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Fugit obcaecati id neque pariatur veniam atque possimus
                    rerum iusto aperiam error.
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
