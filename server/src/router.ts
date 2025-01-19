import path from "node:path";
import express from "express";
import type { Request, Response } from "express";
import multer from "multer";

import userActions from "./modules/user/userActions";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets/images/userprofil/");
  },
  filename: (req, file, cb) => {
    const fileName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    cb(null, `${fileName}${extension}`);
  },
});

const upload = multer({ storage });

router.post(
  "/api/users/file/",
  upload.single("profile-image"),
  (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).send({ message: "Erreur : aucun fichier reçu" });
      return;
    }

    const imageProfileURL = `assets/images/userprofil/${req.file.filename}`;

    res.status(200).json({ imageProfileURL });
  },
);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.add);
router.put("/api/users/:id", userActions.edit);
router.delete("/api/users/:id", userActions.remove);

import videoActions from "./modules/video/videoActions";

router.get("/api/videos", videoActions.browse);
router.get("/api/videos/:id", videoActions.read);
// router.get("/api/videos/:id", videoActions.checkHasVidoAccess);
router.post("/api/videos", videoActions.add);
router.put("/api/videos/:id", videoActions.edit);
router.delete("/api/videos/:id", videoActions.remove);

import categoryActions from "./modules/category/categoryActions";

router.get("/api/category/:id", categoryActions.read);
//vient chercher toutes les videos d'une catégorie à partir de l'id de la catégorie

/* ************************************************************************* */

export default router;
