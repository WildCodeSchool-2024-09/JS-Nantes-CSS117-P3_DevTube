import express from "express";

import multerActions from "./modules/multer/multerActions";

// Route user
import userActions from "./modules/user/userActions";
import authActions from "./utils/authentification/authActions";

const router = express.Router();

router.post(
	"/api/users/file/",
	upload.single("profile-image"),
	(req: Request, res: Response) => {
		if (!req.file) {
			res.status(400).send({ message: "Erreur : aucun fichier reçu" });
			return;
		}
		const imageProfileURL = `/assets/images/userprofil/${req.file.filename}`;
		res.status(200).json({ imageProfileURL });
	},
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

import testimonialsAction from "./modules/Testimonials/testimonialsAction";
router.post("/api/testimonial", testimonialsAction.add);
router.get("/api/testimonial", testimonialsAction.browse);

router.use(authActions.verifyToken);

router.get("/api/videos", videoActions.browse);
router.get("/api/videos/:id", videoActions.read);
router.get("/api/category/:id", categoryActions.read);
router.use(authActions.verifyToken);

router.post("/api/videos", videoActions.add);
router.put("/api/videos/:id", videoActions.edit);
router.delete("/api/videos/:id", videoActions.remove);

/* ************************************************************************* */

export default router;
