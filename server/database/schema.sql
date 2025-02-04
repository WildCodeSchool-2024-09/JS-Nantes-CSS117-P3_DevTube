CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname  VARCHAR(45) NOT NULL,
  lastname  VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  github_url VARCHAR(80),
  linkedin_url VARCHAR(80),
  level INT NOT NULL DEFAULT 0,
  register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  profil_img VARCHAR(200),
  is_admin TINYINT DEFAULT 0 NOT NULL
);

CREATE TABLE testimonial (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  text_testimonial VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE category (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(45) NOT NULL
);

CREATE TABLE video (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name  VARCHAR(45) NOT NULL,
  duration INT NOT NULL,
  thumbnail VARCHAR(200) NOT NULL,
  preview_image VARCHAR(200),
  description  VARCHAR(200),
  category_id  INT NOT NULL,
  is_freemium BOOLEAN NOT NULL DEFAULT FALSE,
  added_date DATE NOT NULL,
  is_heroSlide BOOLEAN NOT NULL DEFAULT FALSE,
  is_popular BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES category(id) 
);


CREATE TABLE favorite (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  video_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (video_id) REFERENCES video(id)
);

INSERT INTO user (firstname, lastname, email, password, github_url, linkedin_url, level, register_date, profil_img, is_admin)
VALUES
  ("Emilie", "De Duyver", "emilie.deduyver@gmail.com", "$argon2id$v=19$m=16,t=2,p=1$SVpXMEx3UjJ3UmhZZEhwMg$Gfc7g89RStUbXDw5Ij7g+w", "https://github.com/EmiLy-Ly-san", "https://www.linkedin.com/in/emilie-de-duyver/", 1, "2025/01/10", "/assets/images/userprofil/profil-emilie.jpg", true),
  ("Fabrice", "Atlan", "fabrice.atlan.56@gmail.com", "$argon2id$v=19$m=19,t=2,p=1$ODJCS2VQZlg2U016b1dtUw$YJpDsIpx9qrGHnMCO/o0QLXiVrFR5HxffhLL3eRz8W0", "https://github.com/FabriceAtlan", "https://www.linkedin.com/in/atlanfabrice/", 1, "2025/01/10", "/assets/images/userprofil/fabrice-atlan.png", true),
  ("Ibrahim", "Yahiaya Adam", "iadam606@yahoo.fr", "$argon2id$v=19$m=19,t=2,p=1$ODJCS2VQZlg2U016b1dtUw$XludgNxFUX2Xh/wtwJampP981YUfrmXND1RZlBylnpE", "https://github.com/IbraAD44", "https://www.linkedin.com/in/ibrahim-adam-47b748261/", 1, "2025/01/10", "/assets/images/userprofil/ibrahim-yahiaya-adam.jpg", true);

INSERT INTO testimonial (user_id, text_testimonial)
VALUES
(1, "les visiteurs et nuire à l’expérience utilisateur, ce qui rend essentiel le suivi régulier de ce critère grâce à un test de vitesse pour vos pages web.");

INSERT INTO category (name)
VALUES
  ("html"),
  ("css"),
  ("algo"),
  ("javascript"),
  ("node.js"),
  ("react"),
  ("github"),
  ("sql"),
  ("express");


INSERT INTO video (name, duration, thumbnail, preview_image, description, category_id, is_freemium, added_date, is_heroSlide, is_popular)
VALUES 
  ("Integration - Partie 1", "27", "/assets/videos/Quest-Welcomeonboard(part1).mp4", "/assets/images/videoPreviewImages/welcomeOnBoard.png","Entraîne toi à reproduire une maquette en HTML avec Nicolas 🐨!", 1, false, "2025-11-01", true, true),
  ("Integration - Partie 2", "17", "/assets/videos/Quest-Welcomeonboard(part2).mp4", "/assets/images/videoPreviewImages/WelcomeOnBoard2.png","Ajoute le CSS pour reproduire une maquette avec Nicolas 🐨!", 2, true, "2025-11-01", false, false),
  ("Basics HTML", "12", "/assets/videos/Workshop1-HTML&CSS(Part1).mp4", "/assets/images/videoPreviewImages/apercu-ex.png","Structure ton site web avec des balises sémantiques avec Nicolas 🐨!", 1, false, "2025-11-01", false, false),
  ("Basics CSS", "12", "/assets/videos/Workshop1-HTML&CSS(Part2).mp4", "/assets/images/videoPreviewImages/workShop2.png", "Donne du style à ton site web avec les propriétés CSS avec Nicolas 🐨!", 2, true, "2025-11-01", false, true),
  ("Responsive - Partie 1", "7", "/assets/videos/Workshop2-HTML&CSS-Responsive(part1).mp4", "/assets/images/videoPreviewImages/resp1.png", "Qu'est qu'un site responsive 🐨 ?", 2, false, "2025-11-01", false, false),
  ("Responsive - Partie 2", "4", "/assets/videos/Workshop2-HTML&CSS-Responsive(part2).mp4", "/assets/images/videoPreviewImages/resp2.png", "Utilise Flex pour rendre ton site responsive avec Nicolas 🐨!", 2, true, "2025-11-01", false, true),
  ("Responsive - Partie 3", "5", "/assets/videos/Workshop2-HTML&CSS-Responsive(part3).mp4", "/assets/images/videoPreviewImages/resp3.png", "Comprendre les media queries pour assurer un site responsive avec Nicolas 🐨!", 2, true, "2025-11-01", false, true),
  ("Discover Express", "6", "/assets/videos/0-express-port.mp4", "/assets/images/videoPreviewImages/0-express.png", "Initialise ton premier serveur Express avec Nicolas 🐨!", 9, false, "2025-01-23", true, false), 
  ("Discover React", "5", "/assets/videos/0-react-let-project.mp4", "/assets/images/videoPreviewImages/0-react.png", "Lance ton premier projet REACT avec Nicolas 🐨!", 6, false, "2025-01-23", false, false),
  ("GET request", "7", "/assets/videos/1-express-get.mp4", "/assets/images/videoPreviewImages/1-express-get.png", "Fait ta première requête GET grâce à Express avec Nicolas 🐨!", 9, false, "2025-01-23", false, false),
  ("Make a component", "13", "/assets/videos/1-react-component-1.mp4", "/assets/images/videoPreviewImages/1-react.png", "Crée ton premier composant React avec Nicolas 🐨!", 6, false, "2025-01-23", true, true),
  ("Database SQL", "7", "/assets/videos/2-express-bdd.mp4", "/assets/images/videoPreviewImages/2-express.png", "Crée ta première data SQL avec Nicolas 🐨!", 8, true, "2025-01-23", false, false),
  ("REACT router", "8", "/assets/videos/2-react-router.mp4", "/assets/images/videoPreviewImages/2-react.png", "Découvre React router avec Nicolas 🐨!", 6, false, "2025-01-23", false, false),
  ("POST request", "13", "/assets/videos/3-express-post.mp4", "/assets/images/videoPreviewImages/2-train-express.png", "Ecris ton premier POST avec Express grâce à  Nicolas 🐨!", 9, true, "2025-01-23", false, false),
  ("REACT + CSS", "11", "/assets/videos/3-react-component-2.mp4", "/assets/images/videoPreviewImages/4-react.png", "Donne du style à ton composant avec Nicolas 🐨!", 6, true, "2025-01-23", false, true),
  ("PUT request", "11", "/assets/videos/4-express-put.mp4", "/assets/images/videoPreviewImages/5-express.png", "Apprends à réaliser un requête PUT avec Nicolas 🐨!", 9, true, "2025-01-23", false, true),
  ("REACT Props", "9", "/assets/videos/4-react-props.mp4", "/assets/images/videoPreviewImages/4-react.png", "Passe des props dans tous les sens avec Nicolas 🐨!", 6, true, "2025-01-23", false, true),
  ("Middlewares", "4", "/assets/videos/5-express-middlewares.mp4", "/assets/images/videoPreviewImages/5-express.png", "Utilise des middlewares dans tes routes Express avec Nicolas 🐨!", 9, false, "2025-01-23", false, false),
  ("Component mapping", "10", "/assets/videos/5-react-map.mp4", "/assets/images/videoPreviewImages/5-react.png", "Map tes composant dans ton appli React avec Nicolas 🐨!", 6, false, "2025-01-23", false, true),
  ("UseState()", "9", "/assets/videos/6-react-state.mp4", "/assets/images/videoPreviewImages/6-react.png", "Utilise des states dans ton application React avec Nicolas 🐨!", 6, false, "2025-01-23", false, false),
  ("Select in React", "10", "/assets/videos/7-react-select-filter.mp4", "/assets/images/videoPreviewImages/7-react.png", "Comprend comment gérer tes select dans React avec Nicolas 🐨!", 6, true, "2025-01-23", false, false),
  ("Fetch in React", "18", "/assets/videos/8-react-fetch.mp4", "/assets/images/videoPreviewImages/8-react.png", "Comprend comment fetcher grâce au react hook useEffect(), et avec Nicolas 🐨!", 6, true, "2025-01-23", false, false),
  ("React Loader", "10", "/assets/videos/9-react-loader.mp4", "/assets/images/videoPreviewImages/9-react.png", "Utilise React Loader avec Nicolas 🐨!", 6, true, "2025-01-23", false, false),
  ("React Context", "17", "/assets/videos/10-react-context.mp4", "/assets/images/videoPreviewImages/10-react.png", "Comprend le fonctionnement du Context dans React, et  avec Nicolas 🐨!", 6, true, "2025-01-23", false, true),
  ("React pagination", "17", "/assets/videos/11-react-pagination.mp4", "/assets/images/videoPreviewImages/11-react.png", "Réalise ta pagination dans React avec Nicolas 🐨!", 6, true, "2025-01-23", false, false),
  ("Form in React", "10", "/assets/videos/12-react-input.mp4", "/assets/images/videoPreviewImages/12-react.png", "Apprends à gérer tes formulaires dans React avec Nicolas 🐨!", 6, true, "2025-01-23", false, false),
  ("Favorites 💗 1", "8", "/assets/videos/13-react-fav-1.mp4", "/assets/images/videoPreviewImages/13-react.png", "Rend la gestion des favoris plus facile grâce à React avec Nicolas 🐨!", 6, true, "2025-01-23", false, false),
  ("Favorites 💙 2", "6", "/assets/videos/14-react-fav-2.mp4", "/assets/images/videoPreviewImages/14-react.png", "Rend la gestion des favoris plus facile grâce à React avec Nicolas 🐨!", 6, false, "2025-01-23", true, false),
  ("Favorites 💜 3", "15", "/assets/videos/15-react-fav-3.mp4", "/assets/images/videoPreviewImages/15-react.png", "Rend la gestion des favoris plus facile grâce à React avec Nicolas 🐨!", 6, false, "2025-01-23", true, false),
  ("Favorites 💚 4", "14", "/assets/videos/16-react-fav-4.mp4", "/assets/images/videoPreviewImages/16-react.png", "Rend la gestion des favoris plus facile grâce à React avec Nicolas 🐨!", 6, true, "2025-01-23", false, false),
  ("BDD trainy", "10", "/assets/videos/train-bdd.mp4", "/assets/images/videoPreviewImages/1-train-express.png", "Entraîne toi aux bases de données avec Nicolas 🐨!", 8, false, "2025-01-23", false, false),
  ("Express trainy 1", "8", "/assets/videos/train-express-1.mp4", "/assets/images/videoPreviewImages/1-train-express.png", "Entraîne toi au framework Express avec Nicolas 🐨!", 9, true, "2025-01-23", false, false),
  ("Express trainy 2", "8", "/assets/videos/train-express-2.mp4", "/assets/images/videoPreviewImages/2-train-express.png", "Entraîne toi au framework Express avec Nicolas 🐨!", 9, true, "2025-01-23", false, false),
  ("Express trainy 3", "2", "/assets/videos/train-express-3.mp4", "/assets/images/videoPreviewImages/3-train-express.png", "Entraîne toi au framework Express avec Nicolas 🐨!", 9, true, "2025-01-23", false, false)