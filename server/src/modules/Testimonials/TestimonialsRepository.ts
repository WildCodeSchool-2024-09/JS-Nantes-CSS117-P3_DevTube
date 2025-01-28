import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { testimonialy } from "./testimonial";

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
  async readAll() {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT u.firstname, u.lastname, u.email, t.text_testimonial FROM user u INNER JOIN testimonial t ON u.id = t.user_id",
      );
      return rows; // return the rows directly
    } catch (err) {
      // Handle or log the error
      console.error("Error fetching testimonials:", err);
      throw new Error("Failed to fetch testimonials"); // Rethrow or handle as needed
    }
  }
}

export default new TestimonialsRepository();
