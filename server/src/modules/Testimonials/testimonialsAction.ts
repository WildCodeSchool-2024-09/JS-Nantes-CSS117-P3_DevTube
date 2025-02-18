import type { RequestHandler } from "express";
import { type JwtPayload, decode } from "jsonwebtoken";
import TestimonialsRepository from "./TestimonialsRepository";

const add: RequestHandler = async (req, res, next) => {
	try {
		const authorization = req.get("Authorization");

		if (!authorization) {
			throw new Error("Authorization header must be provided");
		}
		const secretKey = process.env.APP_SECRET;
		if (!secretKey) {
			throw new Error("no secretKey");
		}
		const [type, token] = authorization.split(" ");

		const payload = decode(token) as JwtPayload;

		const newTestimonial = {
			user_id: payload?.id,
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
