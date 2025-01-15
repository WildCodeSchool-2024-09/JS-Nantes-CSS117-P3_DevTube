import type { RequestHandler } from "express";

// Import access to data
import userRepository from "./userRepository";
import type { User } from "./userRepository";

// Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const users = await userRepository.readAll();

    // Respond with the items in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the user data from the request body
    const newUser: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      github_url: req.body.github_url,
      linkedin_url: req.body.linkedin_url,
      profil_img: req.body.profil_img,
    };

    // Create the user
    const insertId = await userRepository.create(newUser);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// REMOVE operation
const remove: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    const userDeleted = await userRepository.remove(userId);

    if (userDeleted) {
      res.status(200).send("The user has been removed !");
    } else {
      res.sendStatus(404);
      res.send("Pas ok !");
    }
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
      email,
      github_url,
      linkedin_url,
      firstname,
      lastname,
      level,
      register_date,
      profil_img,
      is_admin,
    } = req.body;
    const updateUser = await userRepository.update(
      id,
      email,
      github_url,
      linkedin_url,
      firstname,
      lastname,
      level,
      register_date,
      profil_img,
      is_admin,
    );
    if (updateUser) {
      res.status(200).end("Félicitation");
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
  }
};

export default { browse, read, add, remove, edit };
