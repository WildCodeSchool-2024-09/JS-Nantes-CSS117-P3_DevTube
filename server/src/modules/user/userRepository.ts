import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  email: string;
  github_url: string;
  linkedin_url: string;
  firstname: string;
  lastname: string;
  level: number;
  register_date: string;
  profil_img: string;
  is_admin: boolean;
};

class UserRepository {
  // Create operation
  async create(user: User) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (email, github_url, linkedin_url, firstname, lastname, level, register_date, profil_img, is_admin) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.email,
        user.github_url,
        user.linkedin_url,
        user.firstname,
        user.lastname,
        user.level,
        user.register_date,
        user.profil_img,
        user.is_admin,
      ],
    );
    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // Read operations
  // By id
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  //All
  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [rows] = await databaseClient.query<Rows>("select * from user");

    // Return the array of items
    return rows as User[];
  }

  // Update operation
  async update(
    id: string,
    email: string,
    github_url: string,
    linkedin_url: string,
    firstname: string,
    lastname: string,
    level: number,
    register_date: string,
    profil_img: string,
    is_admin: boolean,
  ) {
    const [row] = await databaseClient.query<Result>(
      "UPDATE user SET email = ?, github_url = ?, linkedin_url = ?, firstname = ?, lastname = ?, level = ?, register_date = ?, profil_img = ?, is_admin = ? WHERE id = ?",
      [
        email,
        github_url,
        linkedin_url,
        firstname,
        lastname,
        level,
        register_date,
        profil_img,
        is_admin,
        id,
      ],
    );
    return row.affectedRows;
  }

  // Delete operation
  async remove(id: number) {
    const [rows] = await databaseClient.query<Result>(
      "DELETE FROM user where id = ?",
      [id],
    );
    return rows.affectedRows;
  }
}

export default new UserRepository();
