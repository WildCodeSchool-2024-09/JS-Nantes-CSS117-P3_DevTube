import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { testimonialy } from "./testimonial";

class TestimonialsRepository {
  async create(testimonial: testimonialy) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (text_testimonial) VALUES (?, )",
      [testimonial.text_testimonial],
    );
    return result.insertId;
  }
}

export default new TestimonialsRepository();
