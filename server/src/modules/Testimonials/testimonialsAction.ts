import type { RequestHandler } from "express";
import TestimonialsRepository from "./TestimonialsRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      text_testimonial: req.body.text_testimonial,
    };

    const insertId = await TestimonialsRepository.create(newUser);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { add };
