import type { RequestHandler } from "express";
import favoriteRepository from "./favoriteRepository";

// Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the favorite data from the request body
    const newFavorite = {
      user_id: req.body.user_id,
      video_id: req.body.video_id,
    };

    // Create the favorite
    const insertId = await favoriteRepository.create(newFavorite);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted video
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { add };
