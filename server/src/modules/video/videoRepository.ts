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

  async update(updateData: {
    id: string;
    name?: string;
    duration?: number;
    thumbnail?: string;
    description?: string;
    category_id?: number;
    preview_image?: string;
    is_freemium?: boolean;
    added_date?: string;
    is_heroSlide?: boolean;
    is_popular?: boolean;
  }) {
    const modifiedUpdateData = {
      name: updateData?.name ? updateData.name : null,
      thumbnail: updateData?.thumbnail ? updateData.thumbnail : null,
      description: updateData?.description ? updateData.description : null,
      preview_image: updateData?.preview_image
        ? updateData.preview_image
        : null,
      added_date: updateData?.added_date ? updateData.added_date : null,
      category_id: updateData?.category_id
        ? Number(updateData.category_id)
        : null,
      is_freemium: updateData?.is_freemium
        ? Number(updateData.is_freemium)
        : null,
      is_heroSlide: updateData?.is_heroSlide
        ? Number(updateData.is_heroSlide)
        : null,
      is_popular: updateData?.is_popular
        ? Number(updateData?.is_popular)
        : null,
      duration: updateData?.duration ? Number(updateData.duration) : null,
    };

    const queryKeys = Object.keys(modifiedUpdateData);
    const queryValues = Object.values(modifiedUpdateData);
    if (queryKeys?.length <= 1) {
      return false;
    }
    const query = `UPDATE video SET ${queryKeys

      .filter(
        (key) => !!modifiedUpdateData?.[key as keyof typeof modifiedUpdateData],
      )
      .map((key) => `${key} = ?`)
      .join(", ")} WHERE id = ?`;
    const values = [
      ...queryValues.filter((value) => !!value),
      Number(updateData.id),
    ];

    const [row] = await databaseClient.query<Result>(query, values);
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
