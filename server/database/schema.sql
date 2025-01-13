CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname  VARCHAR(45) NOT NULL,
  lastname  VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  confirm_password VARCHAR(45) NOT NULL,
  github_url VARCHAR(50),
  linkedin_url VARCHAR(50),
  level INT NOT NULL DEFAULT 0,
  register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  profil_img VARCHAR(200),
  is_admin  TINYINT DEFAULT 0 NOT NULL
);

INSERT INTO user (firstname, lastname, email, password, confirm_password, github_url, linkedin_url, level, register_date, profil_img, is_admin)
VALUES
  ("Emilie", "De Duyver", "emilie.deduyver", "mdp", "mdp", "https://github.com/EmiLy-Ly-san", "https://www.linkedin.com/in/emilie-de-duyver/", 1, "2025/01/10", "/assets/images/userprofil/profil-emilie.jpg", true);
  

