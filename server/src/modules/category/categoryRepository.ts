import databaseClient from "../../../database/client";

import type { Rows } from "../../../database/client";
import type { Video } from "../video/video";

class CategoryRepository {
  // By id
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific video by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from video where category_id = ?",
      [id],
    );

    // Return the first row of the result, which represents the video
    return rows as Video[];
  }
}

export default new CategoryRepository();
