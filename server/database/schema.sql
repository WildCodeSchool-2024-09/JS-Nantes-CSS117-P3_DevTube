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

INSERT INTO user (email, github_url, linkedin_url, firstname, lastname, level, register_date, profil_img, is_admin)
VALUES
  ("emilie.deduyver", "https://github.com/EmiLy-Ly-san", "https://www.linkedin.com/in/emilie-de-duyver/", "Emilie", "De Duyver", 1, "2025/01/10", "/assets/images/userprofil/profil-emilie.jpg", true);
