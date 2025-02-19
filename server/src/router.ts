import express from "express";

import path from "node:path";
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
import TeamProfileAction from "./modules/TeamProfile/TeamProfileAction";
router.get("/api/teamProfil", TeamProfileAction.browse);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", authActions.hashPassword, userActions.add);
router.put("/api/users/:id", userActions.edit);
router.post("/api/users/login", authActions.login);
router.get("/api/users/email/:email", userActions.userByEmail);

import multer from "multer";
import type { FileFilterCallback } from "multer";
import categoryActions from "./modules/category/categoryActions";
// Route video
import videoActions from "./modules/video/videoActions";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(
        null,
        path.join(
          __dirname,
          "..",
          "public",
          "assets",
          "images",
          "videoPreviewImages",
        ),
      );
    } else if (file.mimetype.includes("video")) {
      cb(null, path.join(__dirname, "..", "public", "assets", "videos"));
    }
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.fieldname === "preview_image") {
    file.mimetype.includes("image") ? cb(null, true) : cb(null, false);
  } else if (file.fieldname === "thumbnail") {
    file.mimetype.includes("video") ? cb(null, true) : cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter }).fields([
  { name: "preview_image", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

import testimonialsAction from "./modules/Testimonials/testimonialsAction";
import favoriteActions from "./modules/favorite/favoriteActions";

// Open route to verify tokens validity from the front end
router.get("/api/verify-token", authActions.checkIsValidToken);

router.get("/api/videos", videoActions.browse);
router.get("/api/videos/:id", videoActions.read);
router.get("/api/category/:id", categoryActions.read);
router.get("/api/course", videoActions.browseCourse);
router.get("/api/testimonial", testimonialsAction.browse);
//get all favorites and the datas of all the videos of one user by the user id passes in body
router.get("/api/categories", categoryActions.browse);

//👮‍♀️ Authentication wall
router.use(authActions.verifyToken);

router.get("/api/favorites-user/:id", favoriteActions.readList);
//get all favorites of one user by user-id without datas videos => just a list of favorites
router.get("/api/video-favorites/:id", favoriteActions.readVideos);

router.post("/api/testimonial", testimonialsAction.add);
//vient chercher toutes les videos d'une catégorie à partir de l'id de la catégorie
router.get("/api/download/users", userActions.getUserCsvFile);
router.post("/api/categories", categoryActions.add);

router.post("/api/videos", upload, videoActions.add);
router.put("/api/videos/:id", upload, videoActions.edit);

router.post("/api/favorites-user/favorite", favoriteActions.add);
router.delete("/api/favorites-user/favorite", favoriteActions.remove);

router.delete("/api/videos/:id", videoActions.remove);
router.delete("/api/users", userActions.remove);

router.get("/api/download/users", userActions.getUserCsvFile);

//add a new favorite to one user

//delete one favorite from user favorites

export default router;
