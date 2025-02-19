import type { RequestHandler } from "express";

import TeamProfileRepository from "./TeamProfileRepository";
const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await TeamProfileRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
};
