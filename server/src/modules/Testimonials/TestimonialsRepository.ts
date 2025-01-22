import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

class TestimonialsRepository {
  // Create a new testimonial
  async create(testimonial: { user_id: number; text_testimonial: string }) {
    const { user_id, text_testimonial } = testimonial;

    const query =
      "INSERT INTO testimonial (user_id, text_testimonial) VALUES (?, ?)";

    try {
      // Execute the query with the parameters
      const [result] = await databaseClient.query<Result>(query, [
        user_id,
        text_testimonial,
      ]);

      // Return the insertId from the result
      return result.insertId;
    } catch (err) {
      // Log and handle database error
      console.error("Error inserting testimonial:", err);
      throw new Error("Database error while inserting testimonial");
    }
  }
}

export default new TestimonialsRepository();
