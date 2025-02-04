import type { RequestHandler } from "express";
import TestimonialsRepository from "./TestimonialsRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId: number = req.body.user_id;
    const newTestimonial = {
      user_id: userId, // Assurez-vous que l'ID de l'utilisateur est bien envoyé
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
      res.sendStatus(404); // No testimonials found
    } else {
      res.json(testimonialy); // Return testimonials
    }
  } catch (err) {
    next(err); // Pass any error to the next middleware
  }
};

export default { add, browse };
