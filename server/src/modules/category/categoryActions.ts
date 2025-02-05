import type { RequestHandler } from "express";

// Import access to data
import categoryRepository from "./categoryRepository";

//Read all categories
const browse: RequestHandler = async (req, res, next) => {
  console.warn("hello");
  try {
    // Fetch all categories
    const categories = await categoryRepository.readAll();

    // Respond with the videos in JSON format
    res.json(categories);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

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

// Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the category data from the request body
    const newCategory = {
      name: req.body.name,
    };

    // Create the user
    const insertId = await categoryRepository.create(newCategory);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted video
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { read, add, browse };
