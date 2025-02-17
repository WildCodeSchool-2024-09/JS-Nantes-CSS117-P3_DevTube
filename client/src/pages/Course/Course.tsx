import { useNavigate } from "react-router-dom";
import "../../styles/Course.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Video } from "../../types/video";
import useTheme from "../../utils/useTheme";
import useToast from "../../utils/useToastify";

type Course = {
  id: number;
  title: string;
  key_course: string;
  description: string;
  image: string;
  imgLight?: string;
  type: string;
  coming_soon: 0 | 1;
};
export default function Course() {
  const [course, setCourse] = useState<Course[]>([]);
  const getCourseByType = (type: string) =>
    course.filter((el) => el.type === type);
  const listBasesCourses = getCourseByType("Bases");
  const listFrontEndCourses = getCourseByType("Front-end");
  const listBackEndCourses = getCourseByType("Back-end");
  const { theme } = useTheme();
  const [videosByCategory, setVideosByCategory] = useState<Video[]>();
  const [idOfTheCategoryLanguage, setIdOfTheCategoryLanguage] =
    useState<number>();
  const { notifyError } = useToast();
  const navigate = useNavigate();
  const { t } = useTranslation();

  /*
  TODO Après le merge, faire la traduction de toutes les données.
  La page course.json doit être un tableau d'objet complexe
  const { i18n } = useTranslation();
  */

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");

      const fetchCourse = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/course`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        setCourse(data);
      };

      fetchCourse();
    } catch (err) {
      console.error((err as Error).message);
    }
  }, []);

  useEffect(() => {
    if (idOfTheCategoryLanguage) {
      const urlForVideos = `${import.meta.env.VITE_API_URL}/api/category/${idOfTheCategoryLanguage}`;
      recoverInfoVideos(urlForVideos);
      if (videosByCategory) {
        const videoToFind = videosByCategory.find((video) => {
          return video.is_freemium === 0;
        });

        navigate(`/video/${videoToFind?.id}`);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  }, [idOfTheCategoryLanguage, videosByCategory, navigate]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (event.currentTarget.dataset.id) {
      const idTofind = Number.parseInt(`${event.currentTarget.dataset.id}`);
      if (idTofind) {
        setIdOfTheCategoryLanguage(idTofind);
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
      setVideosByCategory(datas);
    } catch (err) {
      notifyError("You are log out !");
    }
  }
  return (
    <>
      <section className="section-course-container">
        <article className="article-course-title">
          <h1>{`${t("title-course")}`}</h1>
          <p>{`${t("description-course")}`}</p>
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
                  src={theme && el.imgLight ? el.imgLight : el.image}
                  alt="logo icon"
                />
                <section className="figure-description-wrapper">
                  <article className="figure-description-article">
                    <h3>{el.title}</h3>
                    <p>{el.description}</p>
                  </article>
                  {el.coming_soon === 0 ? (
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
                  ) : (
                    <p className="coming-soon">Coming soon !</p>
                  )}
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
                  <img
                    className="figure-course-logo"
                    src={theme && el.imgLight ? el.imgLight : el.image}
                    alt=""
                  />
                  <section className="figure-description-wrapper">
                    <article className="figure-description-article">
                      <h3>{el.title}</h3>
                      <p>{el.description}</p>
                    </article>
                    {el.coming_soon === 0 ? (
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
                    ) : (
                      <p className="coming-soon">Coming soon !</p>
                    )}
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
                    src={theme && el.imgLight ? el.imgLight : el.image}
                    alt="logo icon"
                  />
                  <section className="figure-description-wrapper">
                    <article className="figure-description-article">
                      <h3>{el.title}</h3>
                      <p>{el.description}</p>
                    </article>
                    {el.coming_soon === 0 ? (
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
                    ) : (
                      <p className="coming-soon">Coming soon !</p>
                    )}
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
