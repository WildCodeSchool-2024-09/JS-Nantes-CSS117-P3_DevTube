import type { RequestHandler } from "express";

// Import access to data
import videoRepository from "./videoRepository";

// Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all videos
    const videos = await videoRepository.readAll();

    // Respond with the videos in JSON format
    res.json(videos);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Read operation by id
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific video based on the provided ID
    const videoId = Number(req.params.id);
    const video = await videoRepository.read(videoId);

    const isFreemium = video.is_freemium === 1;
    const isUserAuthenticated = true; // temporary false or true variable

    // If the video is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the video in JSON format
    if (video == null) {
      res.sendStatus(404);
    } else {
      if (isFreemium) {
        // console.log("IS freemium");
        if (isUserAuthenticated) {
          // console.log("IS AUTHENTICATED , j envoie la video");
          res.json(video);
        } else {
          // console.log("❌ IS NOT AUTHENTICATED - 403");
          res.sendStatus(403);
        }
      } else {
        // console.log("IS NOT FREEMIUM 💚");
        res.json(video);
      }
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the video data from the request body
    const newVideo = {
      name: req.body.name,
      duration: req.body.duration,
      thumbnail: req.body.thumbnail,
      preview_image: req.body.preview_image,
      description: req.body.description,
      category_id: req.body.category_id,
      is_freemium: req.body.is_freemium,
      added_date: req.body.added_date,
      is_heroSlide: req.body.is_heroSlide,
      is_popular: req.body.is_popular,
    };

    // Create the user
    const insertId = await videoRepository.create(newVideo);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted video
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// REMOVE operation
const remove: RequestHandler = async (req, res, next) => {
  try {
    const videoId = Number(req.params.id);

    const videoToRemove = await videoRepository.remove(videoId);
    res.status(201).json({ videoToRemove });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

//UPDATE
const edit: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
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
    } = req.body;
    const updateVideo = await videoRepository.update(
      id,
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
    );
    if (updateVideo) {
      res.status(200).end("Félicitation");
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
  }
};

export default { browse, read, add, remove, edit };
