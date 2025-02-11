import type { RequestHandler } from "express";
import favoriteRepository from "./favoriteRepository";

// Read operation by id
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific favorite based on the provided ID user
    const userId = Number(req.params.id);
    const favorites = await favoriteRepository.read(userId);

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the video in JSON format
    if (favorites == null) {
      res.sendStatus(404);
    } else {
      res.json(favorites);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

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

    // Respond with HTTP 201 (Created) and the ID of the newly inserted favorite
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// REMOVE operation
const remove: RequestHandler = async (req, res, next) => {
  try {
    const favorite = {
      video_id: req.body.video_id,
      user_id: req.body.user_id,
    };

    const favoriteToRemove = await favoriteRepository.remove(favorite);
    res.status(201).json({ favoriteToRemove });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

//GET : api/resources/:id
// req.params

// POST : api/resource
// body : {
// videoId: 2,
// fav: 23,
// }

export default { add, read, remove };
