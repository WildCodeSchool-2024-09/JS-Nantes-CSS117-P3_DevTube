import type { RequestHandler } from "express";

import { downloadCsvUser } from "../../utils/downloadCSVUser";
// Import access to data
import type { User } from "./user";
import userRepository from "./userRepository";

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
      password: req.body.hashed_password,
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
    const userEmail = req.query.email;

    if (typeof userEmail !== "string") {
      throw new Error("Invalid email format.");
    }

    const userDeleted = await userRepository.remove(userEmail);

    if (userDeleted) {
      res.status(200).send("The user has been removed !");
    }
  } catch (err) {
    next(err);
  }
};

//UPDATE
const edit: RequestHandler = async (req, res, next) => {
  console.warn(req.params.id);
  try {
    const { id } = req.params;
    const { firstname, lastname, email, github_url, linkedin_url, profil_img } =
      req.body;
    const updateUser = await userRepository.update(
      id,
      firstname,
      lastname,
      email,
      github_url,
      linkedin_url,
      profil_img,
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

const checkIfUser: RequestHandler = async (req, res, next) => {
  try {
    const { name } = req.body;
    const getIsUser = await userRepository.read(name);

    if (getIsUser) {
      next();
    } else {
      res.status(401).send("This user already exists !");
    }
  } catch (err) {
    console.error(err);
  }
};

const userByEmail: RequestHandler = async (req, res, next) => {
  const { email } = req.params;

  try {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(user);
    return;
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

const getUserCsvFile: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    downloadCsvUser(res, users as User[], "users.csv");
    return;
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  browse,
  read,
  add,
  remove,
  edit,
  checkIfUser,
  userByEmail,
  getUserCsvFile,
};
