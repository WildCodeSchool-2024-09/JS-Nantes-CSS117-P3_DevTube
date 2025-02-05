import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { testimonialy } from "./testimonial";

class TestimonialsRepository {
  async create(testimonial: { user_id: number; text_testimonial: string }) {
    const { user_id, text_testimonial } = testimonial;

    const query =
      "INSERT INTO testimonial (user_id, text_testimonial) VALUES (?, ?)";

    try {
      const [result] = await databaseClient.query<Result>(query, [
        user_id,
        text_testimonial,
      ]);

      return result.insertId;
    } catch (err) {
      console.error("Error inserting testimonial:", err);
      throw new Error("Database error while inserting testimonial");
    }
  }
  async readAll() {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT u.firstname, u.lastname, u.email, t.text_testimonial,level,profil_img FROM user u INNER JOIN testimonial t ON u.id = t.user_id",
      );
      return rows;
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      throw new Error("Failed to fetch testimonials");
    }
  }
}

export default new TestimonialsRepository();
