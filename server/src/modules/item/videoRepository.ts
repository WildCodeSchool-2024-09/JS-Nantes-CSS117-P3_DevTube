import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  email: string;
  firstname: string;
  lastname: string;
  level: string;
  register_date: string;
  profil_img: string;
  is_admin: string;
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into user (email, firstname, lastname, level, register_date, profil_img, is_admin) values (?, ?)",
      [
        user.email,
        user.firstname,
        user.lastname,
        user.level,
        user.register_date,
        user.profil_img,
        user.is_admin,
      ],
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from user");

    // Return the array of items
    return rows as User[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new ItemRepository();
