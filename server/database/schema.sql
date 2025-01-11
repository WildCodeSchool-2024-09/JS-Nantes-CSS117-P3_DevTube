CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(45) NOT NULL,
  github_url VARCHAR(50),
  linkedin_url VARCHAR(50),
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
  ("css"),


INSERT INTO video (name, duration, thumbnail, description, category_id, is_freemium)
VALUES 
  ("CSS TRICKS", "60", "", 2, false);


