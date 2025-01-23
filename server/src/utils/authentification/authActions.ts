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

    res.status(202).json({ token, user: user.email });
  } else {
    res.sendStatus(422);
  }
};

// Vérification du token
const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.get("Authorization");

    if (!authorization) {
      // Récupération du header Authorization de la requête
      throw new Error("Authorization header must be provided");
    }

    // Vérification si le mot Bearer est présent dans la requête
    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
      // Spliter authorization

      throw new Error("Bearer must be provided");
    }

    // Vérification de la secretKey
    const secretKey = process.env.APP_SECRET;

    if (!secretKey) {
      throw new Error("A secret key must be provided");
    }

    jwt.verify(token, secretKey);

    next();
  } catch (err) {
    res.status(400).send(err);
  }
};
export default { hashPassword, login, verifyToken };
