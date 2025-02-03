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

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", authActions.hashPassword, userActions.add);
router.put("/api/users/:id", userActions.edit);
router.delete("/api/users/", userActions.remove);
router.post("/api/users/login", authActions.login);
router.get("/api/users/email/:email", userActions.userByEmail);

import multer from "multer";
import categoryActions from "./modules/category/categoryActions";
// Route video
import videoActions from "./modules/video/videoActions";

const storage = multer.diskStorage({
  // storage demandé comme nom de variable par multer, il attend cenom là
  destination: path.join(
    __dirname,
    "public",
    "assets",
    "images",
    "videoPreviewImages",
  ),
  filename: (req, file, callback) => {
    // console.log({ file });
    // callback est parfois ecrit cb
    callback(null, `${Date.now()}-${file.originalname}`); // GENERER un nom aleatoire avec la date en millisecondes + lenom du fichier connu par maulter
  },
});

const upload = multer({ storage: storage });

router.get("/api/videos", videoActions.browse);
router.get("/api/videos/:id", videoActions.read);
// Open route to verify tokens validity from the front end
router.get("/api/verify-token", authActions.checkIsValidToken);
router.get("/api/category/:id", categoryActions.read);
//vient chercher toutes les videos d'une catégorie à partir de l'id de la catégorie

router.delete("/api/videos/:id", videoActions.remove);
router.use(authActions.verifyToken);

router.get("/api/download/users", userActions.getUserCsvFile);
router.post("/api/videos", videoActions.add);
router.put(
  "/api/videos/:id",
  // TODO: upload fields
  upload.fields([
    { name: "preview_image", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  // upload.single("preview_image"),
  videoActions.edit,
);

/* ************************************************************************* */

export default router;
