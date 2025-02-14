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
  // Mettre un try catch
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
      firstname: user.firstname,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(202).json({
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        github_url: user.github_url,
        linkedin_url: user.linkedin_url,
        profil_img: user.profil_img,
        is_admin: user.is_admin,
      },
    });
  } else {
    res.sendStatus(422);
  }
};

// Helper to validate a token -> Fabrice tu peux l'utiliser plus bas ;-)
const getIsTokenValid = (token: string) => {
  try {
    const secretKey = process.env.APP_SECRET;

    if (!secretKey) {
      throw new Error("A secret key must be provided");
    }
    const verifiedToken = jwt.verify(token, secretKey);

    if (verifiedToken) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

// Vérification du token => middleware
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

    // const isTokenValid = getIsTokenValid(token);

    const payload = jwt.verify(token, secretKey) as {
      id: number;
      email: string;
    };

    const id = payload.id;

    const user = await userRepository.read(id);

    req.body.userFromBack = user;

    if (payload) {
      next();
    } else {
      throw new Error("JWT invalid");
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
};

// Verify token validity => not middleware : route for validate token at app first load
// TODO : factorize common code in authActions
const checkIsValidToken: RequestHandler = async (req, res, next) => {
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

    const isTokenValid = getIsTokenValid(token);

    if (isTokenValid) {
<<<<<<< HEAD
      res.status(200).send("Token verified");
    } else {
      res.status(401).send("Invalid Token");
=======
      const decodedToken = jwt.decode(token);
      res.status(200).send(decodedToken);
    } else {
      throw new Error("JWT invalid");
>>>>>>> e5329d6446d290ffae04405bc226bf65764dbb1d
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
export default {
  hashPassword,
  login,
  verifyToken,
  checkIsValidToken,
  getIsTokenValid,
};
