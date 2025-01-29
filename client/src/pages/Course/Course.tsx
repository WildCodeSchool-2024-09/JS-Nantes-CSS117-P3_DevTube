import { useNavigate } from "react-router-dom";
import "../../styles/Course.css";
import { useEffect, useState } from "react";
import type { Video } from "../../types/video";
import useTheme from "../../utils/useTheme";
import useToast from "../../utils/useToastify";

type Course = {
  id: number;
  title: string;
  description: string;
  img: string;
  imgLight?: string;
  type: string;
};
const lstCourse: Course[] = [
  {
    id: 1,
    title: "Learn HTML",
    description:
      "HTML (HyperText Markup Language) is the standard language for creating web pages and web applications. It structures content using elements such as headings, paragraphs, links, and multimedia.",
    img: "logo-html.png",
    type: "Bases",
  },
  {
    id: 2,
    title: "Discover  le CSS",
    description:
      "CSS (Cascading Style Sheets) is a stylesheet language used to control the presentation of web pages. It defines the layout, colors, fonts, and overall visual appearance of HTML elements.",
    img: "logo-css.png",
    type: "Bases",
  },
  {
    id: 3,
    title: "Algo basics",
    description:
      "The basics of algorithms involve step-by-step instructions to solve problems or perform tasks efficiently. They focus on concepts like loops, conditions, functions, and data structures for logical problem-solving.",
    img: "logo-algo-basics.png",
    type: "Bases",
  },
  {
    id: 4,
    title: "Know everything about JavaScript",
    description:
      "JavaScript is a versatile programming language used to create dynamic and interactive web content. It enables developers to manipulate HTML, handle events, and build complex web applications.",
    img: "logo-javascript.png",
    type: "Front-end",
  },
  {
    id: 5,
    title: "Know everything about Node.js",
    description:
      "Node.js is a runtime environment that allows JavaScript to run on the server side. It is designed for building scalable, high-performance applications using non-blocking, event-driven architecture.",
    img: "logo-node.png",
    type: "Back-end",
  },
  {
    id: 6,
    title: "Welcome to REACT",
    description:
      "React is a popular JavaScript library for building user interfaces. It enables developers to create reusable components and manage dynamic data efficiently with a virtual DOM.",
    img: "logo-react.png",
    type: "Front-end",
  },
  {
    id: 7,
    title: "Master the GitHub workflow",
    description:
      "The GitHub workflow involves using Git for version control, collaborating through branches, and managing changes with pull requests. It streamlines teamwork, code review, and deployment in software development.",
    img: "logo-github.png",
    type: "Front-end",
  },
  {
    id: 8,
    title: "The wondefull world of MySQL",
    description:
      "MySQL is a widely used open-source relational database management system. It allows developers to store, manage, and retrieve data efficiently using structured queries with SQL.",
    img: "logo-sql.png",
    type: "Back-end",
  },
  {
    id: 9,
    title: "Server rating with  Express",
    description:
      "Express is a fast and minimalist web framework for Node.js. It simplifies server creation by providing robust tools for handling routes, middleware, and HTTP requests.",
    img: "logo-express.png",
    imgLight: "express-icon-for-light-theme.png",
    type: "Back-end",
  },
];
export default function Course() {
  const getCourseByType = (type: string) =>
    lstCourse.filter((el) => el.type === type);
  const listBasesCourses = getCourseByType("Bases");
  const listFrontEndCourses = getCourseByType("Front-end");
  const listBackEndCourses = getCourseByType("Back-end");
  const { theme } = useTheme();
  const [videosByCategory, setVideosByCategory] = useState<Video[]>();
  const [idOfTheCategoryLanguage, setIdOfTheCategoryLanguage] =
    useState<number>();
  const { notifyError } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const urlForVideos = `${import.meta.env.VITE_API_URL}"/api/category/${idOfTheCategoryLanguage}`;
    recoverInfoVideos(urlForVideos);
  }, [idOfTheCategoryLanguage]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (event.currentTarget.dataset.id) {
      const idTofind = Number.parseInt(`${event.currentTarget.dataset.id}`);
      if (idTofind) {
        setIdOfTheCategoryLanguage(idTofind);
      }

      // console.log({ videosByCategory });
      if (videosByCategory) {
        navigate(`/video/${videosByCategory[0].id}`);
      }
    }
  };

  async function recoverInfoVideos(url: string) {
    const token = localStorage.getItem("token");

    try {
      const request = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const datas = await request.json();
      // console.log({ datas });
      setVideosByCategory(datas);
      // console.log({ videosByCategory });
    } catch (err) {
      notifyError("You are log out !");
    }
  }
  return (
    <>
      <section className="section-course-container">
        <article className="article-course-title">
          <h1>Learn Web developement</h1>
          <p>
            Master the fundamentals of web development and learn how to create
            modern, fully functional websites step by step.
          </p>
        </article>
        {/* Vertical line */}
        <img
          className="vertical-line"
          src={
            theme
              ? "vertical-line-course-light-theme.png"
              : "vertical-line-course-link.png"
          }
          alt=""
        />

        {/* Bases section */}
        <section className="section-bases">
          <h2>Bases</h2>
          {listBasesCourses.map((el) => {
            return (
              <figure key={el.id} className="course-figure-background">
                <img
                  className="figure-course-logo"
                  src={theme && el.imgLight ? el.imgLight : el.img}
                  alt=""
                />
                <section className="figure-description-wrapper">
                  <article className="figure-description-article">
                    <h3>{el.title}</h3>
                    <p>{el.description}</p>
                  </article>
                  <button
                    data-id={el.id}
                    type="button"
                    className="figure-course-navigation-button"
                    aria-label="Navigate to the course."
                    onClick={(event) => {
                      handleClick(event);
                    }}
                  >
                    <img
                      className="figure-course-navigation"
                      src={
                        theme
                          ? "button-see-course-for-light-theme.png"
                          : "button-see-course.png"
                      }
                      alt=""
                    />
                  </button>
                </section>
              </figure>
            );
          })}
        </section>
        {/* Specialization section */}
        <section className="section-specialization">
          {/* Horizontal line */}
          <img
            className="horizontal-line"
            src={
              theme
                ? "horizontal-line-course-light-theme.png"
                : "horizontal-line-course-link.png"
            }
            alt=""
          />
          {/* Left vertical line */}
          <img
            className="vertical-line-left"
            src={
              theme
                ? "vertical-line-course-light-theme.png"
                : "vertical-line-course-link.png"
            }
            alt=""
          />
          {/* Right vertical line */}
          <img
            className="vertical-line-right"
            src={
              theme
                ? "vertical-line-course-light-theme.png"
                : "vertical-line-course-link.png"
            }
            alt=""
          />
          {/* Front-end section */}
          <section className="section-front-end">
            <h2>Front-end</h2>
            {listFrontEndCourses.map((el) => {
              return (
                <figure key={el.id} className="course-figure-background">
                  <img className="figure-course-logo" src={el.img} alt="" />
                  <section className="figure-description-wrapper">
                    <article className="figure-description-article">
                      <h3>{el.title}</h3>
                      <p>{el.description}</p>
                    </article>
                    <button
                      type="button"
                      className="figure-course-navigation-button"
                      aria-label="Navigate to the course."
                    >
                      <img
                        className="figure-course-navigation"
                        src={
                          theme
                            ? "button-see-course-for-light-theme.png"
                            : "button-see-course.png"
                        }
                        alt=""
                      />
                    </button>
                  </section>
                </figure>
              );
            })}
          </section>

          {/* Back-end section */}
          <section className="section-back-end">
            <h2>Back-end</h2>
            {listBackEndCourses.map((el) => {
              return (
                <figure key={el.id} className="course-figure-background">
                  <img
                    className="figure-course-logo"
                    src={theme && el.imgLight ? el.imgLight : el.img}
                    alt=""
                  />
                  <section className="figure-description-wrapper">
                    <article className="figure-description-article">
                      <h3>{el.title}</h3>
                      <p>{el.description}</p>
                    </article>
                    <button
                      type="button"
                      className="figure-course-navigation-button"
                      aria-label="Navigate to the course."
                    >
                      <img
                        className="figure-course-navigation"
                        src={
                          theme
                            ? "button-see-course-for-light-theme.png"
                            : "button-see-course.png"
                        }
                        alt=""
                      />
                    </button>
                  </section>
                </figure>
              );
            })}
          </section>
        </section>
      </section>
    </>
  );
}
