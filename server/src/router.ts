import path from "node:path";
import express from "express";
import type { Request, Response } from "express";

import userActions from "./modules/user/userActions";

const router = express.Router();

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.add);
router.put("/api/users/:id", userActions.edit);
router.delete("/api/users/:id", userActions.remove);

import videoActions from "./modules/video/videoActions";

router.get("/api/videos", videoActions.browse);
router.get("/api/videos/:id", videoActions.read);
router.post("/api/videos", videoActions.add);
router.put("/api/videos/:id", videoActions.edit);
router.delete("/api/videos/:id", videoActions.remove);

import categoryActions from "./modules/category/categoryActions";

router.get("/api/category/:id", categoryActions.read);
//vient chercher toutes les videos d'une catégorie à partir de l'id de la catégorie

/* ************************************************************************* */

export default router;
