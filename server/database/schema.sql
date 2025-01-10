CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(45) NOT NULL,
  firstname  VARCHAR(45) NOT NULL,
  lastname  VARCHAR(45) NOT NULL,
  level  INT NOT NULL DEFAULT 0,
  register_date DATE NOT NULL,
  profil_img VARCHAR(200),
  is_admin  BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO user (email, firstname, lastname, level, register_date, profil_img, is_admin)
VALUES
  ("emilie.deduyver", "Emilie", "De Duyver", 1, "2025/01/10", "../public/assets/images/userprofil/profil-emilie.jpg", true);
  

