import type { RequestHandler } from "express";
import TestimonialsRepository from "./TestimonialsRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId: number = req.body.user_id;
    const newTestimonial = {
      user_id: userId,
      text_testimonial: req.body.text_testimonial,
    };

    const insertId = await TestimonialsRepository.create(newTestimonial);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};
const browse: RequestHandler = async (req, res, next) => {
  try {
    const testimonialy = await TestimonialsRepository.readAll();

    if (!testimonialy || testimonialy.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(testimonialy);
    }
  } catch (err) {
    next(err);
  }
};

export default { add, browse };
