import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { Favorite } from "./Favorite";

class CategoryRepository {
  // By id
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific video by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from favorite where user = ?",
      [id],
    );

    // Return the first row of the result, which represents the video
    return rows as Favorite[];
  }

  // Create operation
  async create(favorite: Favorite) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into favorite (user_id, video_id) values (?, ?)",
      [favorite.user_id, favorite.video_id],
    );
    // Return the ID of the newly inserted category
    return result.insertId;
  }
}

export default new CategoryRepository();
