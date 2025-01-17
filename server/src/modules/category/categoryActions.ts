import type { RequestHandler } from "express";

// Import access to data
import categoryRepository from "./categoryRepository";

// Read operation by id
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific category based on the provided ID
    const categoryId = Number(req.params.id);
    const category = await categoryRepository.read(categoryId);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the video in JSON format
    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { read };
