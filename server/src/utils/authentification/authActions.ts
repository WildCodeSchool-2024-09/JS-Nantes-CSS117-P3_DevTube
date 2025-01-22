import argon2, { verify } from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../../modules/user/userRepository";

const hashPassword: RequestHandler = async (req, res, next) => {
  const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 19 * 2 ** 10,
    timeCost: 2,
    parallelism: 1,
  };

  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;

    return next();
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userRepository.getUserByEmail(email);

  if (user === null || user === undefined) {
    res.sendStatus(404);
    return;
  }

  const isVerified = await verify(user.password as string, password);

  if (isVerified) {
    const secretKey = process.env.APP_SECRET;

    if (!secretKey) {
      throw new Error("Clé secret invalide.");
    }
    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.json({ token, user: user.email });
  } else {
    res.sendStatus(422);
  }
};

export default { hashPassword, login };
