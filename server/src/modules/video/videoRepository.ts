import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { Video } from "./video";

class VideoRepository {
  // Create operation
  async create(video: Video) {
    // Execute the SQL INSERT query to add a new video to the "video" table
    const [result] = await databaseClient.query<Result>(
      "insert into video (name, duration, thumbnail, preview_image, description, category_id, is_freemium, added_date, is_heroSlide, is_popular) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        video.name,
        video.duration,
        video.thumbnail,
        video.preview_image,
        video.description,
        video.category_id,
        video.is_freemium,
        video.added_date,
        video.is_heroSlide,
        video.is_popular,
      ],
    );
    // Return the ID of the newly inserted video
    return result.insertId;
  }

  // Read operations
  // By id
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific video by its ID with url
    const [rows] = await databaseClient.query<Rows>(
      "select * from video where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the video
    return rows[0] as Video;
  }

  //All
  async readAll() {
    // Execute the SQL SELECT query to retrieve all videos from the "video" table without url for security
    const [rows] = await databaseClient.query<Rows>(
      "select id, name, duration, description, category_id, preview_image, is_freemium, added_date, is_heroSlide, is_popular from video order by id desc",
    );

    // Return the array of videos
    return rows as Video[];
  }

  // Update operation
  async update(
    id: string,
    name: string,
    duration: number,
    thumbnail: string,
    preview_image: string,
    description: string,
    category_id: number,
    is_freemium: boolean,
    added_date: string,
    is_heroSlide: true,
    is_popular: true,
  ) {
    const [row] = await databaseClient.query<Result>(
      "UPDATE video SET name = ?, duration = ?, thumbnail = ?, preview_image = ?, description = ?, category_id = ?, is_freemium = ?, added_date = ?, is_heroSlide = ?, is_popular = ? WHERE id = ?",
      [
        name,
        duration,
        thumbnail,
        preview_image,
        description,
        category_id,
        is_freemium,
        added_date,
        is_heroSlide,
        is_popular,
        id,
      ],
    );
    return row.affectedRows;
  }

  // Delete operation
  async remove(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "DELETE FROM video where id = ?",
      [id],
    );
    return rows[0] as Video;
  }
}

export default new VideoRepository();
