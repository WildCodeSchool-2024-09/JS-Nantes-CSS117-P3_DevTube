import "../../styles/Course.css";

const lstCourse = [
  {
    id: 1,
    title: "Learn HTML",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non nisi et dolor aliquam pretium. Maecenas et finibus neque, vitae.",
    img: "logo-html.png",
  },
  {
    id: 2,
    title: "Discover  le CSS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non nisi et dolor aliquam pretium. Maecenas et finibus neque, vitae.",
    img: "logo-css.png",
  },
  {
    id: 3,
    title: "Algo basics",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non nisi et dolor aliquam pretium. Maecenas et finibus neque, vitae.",
    img: "logo-algo-basics.png",
  },
  {
    id: 4,
    title: "Know everything about JavaScript ",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non nisi et dolor aliquam pretium. Maecenas et finibus neque, vitae.",
    img: "logo-javascript.png",
  },
  {
    id: 5,
    title: "Know everything about Node.js",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non nisi et dolor aliquam pretium. Maecenas et finibus neque, vitae.",
    img: "logo-node.png",
  },
  {
    id: 6,
    title: "Welcome to REACT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non nisi et dolor aliquam pretium. Maecenas et finibus neque, vitae.",
    img: "logo-react.png",
  },
  {
    id: 7,
    title: "Master the GitHub workflow",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non nisi et dolor aliquam pretium. Maecenas et finibus neque, vitae.",
    img: "logo-github.png",
  },
  {
    id: 8,
    title: "The wondefull world of MySQL",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non nisi et dolor aliquam pretium. Maecenas et finibus neque, vitae.",
    img: "logo-sql.png",
  },
  {
    id: 9,
    title: "Server rating with  Express",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam non nisi et dolor aliquam pretium. Maecenas et finibus neque, vitae.",
    img: "logo-express.png",
  },
];
export default function Course() {
  return (
    <>
      <section className="section-course-container">
        <article className="article-course-title">
          <h1>Learn Web developement</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac
            efficitur mauris. Aenean vel odio orci. Donec aliquam dignissim
            purus id tempus. Vivamus et ultricies tortor.
          </p>
        </article>

        <section className="section-bases">
          {lstCourse.map((el) => {
            return (
              <figure key={el.id} className="course-figure-background">
                <img className="figure-course-logo" src={el.img} alt="" />
                <h3>{el.title}</h3>
                <section className="figure-description-wrapper">
                  <p>{el.description}</p>
                  <button
                    type="button"
                    className="figure-course-navigation-button"
                  >
                    <img
                      className="figure-course-navigation"
                      src="button-see-course.png"
                      alt=""
                    />
                  </button>
                </section>
              </figure>
            );
          })}
        </section>
      </section>
    </>
  );
}
