import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { Video } from "../video/video";
import type { Favorite } from "./Favorite";

class CategoryRepository {
  async readVideosFav(id: number) {
    try {
      const [rows] = await databaseClient.query<Rows>(
        " SELECT v.* FROM favorite f INNER JOIN video v ON f.video_id = v.id WHERE f.user_id = ?",
        [id],
      );
      return rows as Video[];
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des vidéos favorites :",
        error,
      );
      throw new Error("Impossible de récupérer les vidéos favorites");
    }
  }

  // By id
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific video by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from favorite where user_id = ?",
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

  // Delete operation
  async remove(favorite: Favorite) {
    const [rows] = await databaseClient.query<Rows>(
      "DELETE FROM favorite where video_id = ? AND user_id = ?",
      [favorite.video_id, favorite.user_id],
    );
    return rows[0] as Favorite;
  }
}

export default new CategoryRepository();
