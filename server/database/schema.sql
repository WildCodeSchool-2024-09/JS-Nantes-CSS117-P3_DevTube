CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(45) NOT NULL,
  github_url VARCHAR(100),
  linkedin_url VARCHAR(100),
  firstname  VARCHAR(45) NOT NULL,
  lastname  VARCHAR(45) NOT NULL,
  level  INT NOT NULL DEFAULT 0,
  register_date DATE NOT NULL,
  profil_img VARCHAR(200),
  is_admin  BOOLEAN NOT NULL DEFAULT FALSE
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
  description  VARCHAR(200),
  category_id  INT NOT NULL,
  is_freemium BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (category_id) REFERENCES category(id) 
);

CREATE TABLE favorite (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT NOT NULL,
  video_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (video_id) REFERENCES video(id)
);

INSERT INTO user (email, github_url, linkedin_url, firstname, lastname, level, register_date, profil_img, is_admin)
VALUES
  ("emilie.deduyver@gmail.com", "https://github.com/EmiLy-Ly-san", "https://www.linkedin.com/in/emilie-de-duyver/", "Emilie", "De Duyver", 1, "2025/01/10", "/assets/images/userprofil/profil-emilie.jpg", true),
  ("fabrice.atlan.56@gmail.com", "https://github.com/FabriceAtlan", "https://www.linkedin.com/in/atlanfabrice/", "Fabrice", "Atlan", 1, "2025/01/10", "/assets/images/userprofil/fabrice-atlan.png", true),
  ("iadam606@yahoo.fr", "https://github.com/IbraAD44", "https://www.linkedin.com/in/ibrahim-adam-47b748261/", "Ibrahim", "Yahiaya Adam", 1, "2025/01/10", "/assets/images/userprofil/ibrahim-yahiaya-adam.jpg", true);

INSERT INTO category (name)
VALUES
  ("html"),
  ("css")
  ("algo"),
  ("javascript"),
  ("node.js"),
  ("react"),
  ("github"),
  ("sql"),
  ("express");


INSERT INTO video (name, duration, thumbnail, description, category_id, is_freemium)
VALUES 
  ("Integration d'une maquette - Partie 1", "27", "/assets/videos/Quest-Welcomeonboard(part1).mp4", "Entraîne toi à reproduire une maquette en HTML", 1, false),
  ("Integration d'une maquette - Partie 2", "17", "/assets/videos/Quest-Welcomeonboard(part2).mp4", "Ajoute le CSS pour reproduire une maquette", 2, true),
  ("Basics HTML & CSS - Partie 1", "12", "/assets/videos/Worksop1-HTML&CSS(Part1).mp4", "Structure ton site web avec des balises sémantiques", 1, false),
  ("Basics HTML & CSS - Partie 2", "12", "/assets/videos/Worksop1-HTML&CSS(Part2).mp4", "Donne du style à ton site web avec les propriétés CSS", 2, true),
  ("Responsive - Partie 1", "7", "/assets/videos/Worksop2-HTML&CSS(part1).mp4", "Qu'est qu'un site responsive ?", 2, false),
  ("Responsive - Partie 2", "4", "/assets/videos/Worksop2-HTML&CSS(part2).mp4", "Utilise Flex pour rendre ton site responsive", 2, true),
  ("Responsive - Partie 3", "5", "/assets/videos/Worksop2-HTML&CSS(part3).mp4", "Comprendre les media queries pour assurer un site responsive", 2, true);

  


