import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { User } from "./user";

class UserRepository {
  // Create operation
  async create(user: User) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, email, password, github_url, linkedin_url, profil_img) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.email,
        user.password,
        user.github_url,
        user.linkedin_url,
        user.profil_img,
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
  async remove(email: string) {
    const [rows] = await databaseClient.query<Result>(
      "DELETE FROM user where email = ?",
      [email],
    );
    return rows.affectedRows;
  }

  async getUserByEmail(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email],
    );

    return rows[0] as User;
  }
}

export default new UserRepository();
