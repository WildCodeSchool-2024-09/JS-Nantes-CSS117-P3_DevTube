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

export default { add };
