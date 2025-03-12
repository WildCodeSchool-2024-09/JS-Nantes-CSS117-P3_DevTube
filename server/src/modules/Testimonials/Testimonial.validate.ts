import type { NextFunction, Request, Response } from "express";
import Joi from "joi";

const schema = Joi.object({
  user_id: Joi.number().integer().positive().required(), // ID utilisateur, entier positif obligatoire
  text_testimonial: Joi.string().min(1).required(), // Témoignage, chaîne non vide obligatoire
  userFromBack: Joi.object({
    id: Joi.number().integer().positive().required(), // ID utilisateur, entier positif obligatoire
    firstname: Joi.string().min(1).max(100).required(), // Prénom (max 100 caractères)
    lastname: Joi.string().min(1).max(100).required(), // Nom de famille (max 100 caractères)
    email: Joi.string().email().required(), // Email valide obligatoire
    github_url: Joi.string().uri().optional().allow(null, ""), // URL GitHub valide, optionnelle car permet le null
    linkedin_url: Joi.string().uri().optional().allow(null, ""), // URL LinkedIn valide, optionnelle
    level: Joi.number().integer().min(0).required(), // Niveau utilisateur, entier >= 0 obligatoire
    register_date: Joi.date().iso().required(), // Date d'inscription, format ISO 8601
    profil_img: Joi.string().optional().allow(null, ""), // Chemin de l'image de profil, optionnel
    is_admin: Joi.number().valid(0, 1).required(), // Boolean (0 = non, 1 = oui), obligatoire
  }).required(), // L'objet userFromBack est obligatoire
});

const validateTestimonial = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(422).json(error);
  } else {
    next();
  }
};

export { validateTestimonial };
