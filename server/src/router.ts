import express from "express";

import multerActions from "./modules/multer/multerActions";

// Route user
import userActions from "./modules/user/userActions";
import authActions from "./utils/authentification/authActions";

const router = express.Router();

router.post(
  "/api/users/file",
  multerActions.upload.single("profile-image"),
  multerActions.single,
);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", authActions.hashPassword, userActions.add);
router.put("/api/users/:id", userActions.edit);
router.delete("/api/users/", userActions.remove);
router.post("/api/users/login", authActions.login);
router.get("/api/users/email/:email", userActions.userByEmail);

import categoryActions from "./modules/category/categoryActions";
// Route video
import videoActions from "./modules/video/videoActions";

router.get("/api/videos", videoActions.browse);
router.get("/api/videos/:id", videoActions.read);
// Open route to verify tokens validity from the front end
router.get("/api/verify-token", authActions.checkIsValidToken);
router.get("/api/category/:id", categoryActions.read);
//vient chercher toutes les videos d'une catégorie à partir de l'id de la catégorie

router.use(authActions.verifyToken);

router.post("/api/videos", videoActions.add);
router.put("/api/videos/:id", videoActions.edit);
router.delete("/api/videos/:id", videoActions.remove);

/* ************************************************************************* */

export default router;
