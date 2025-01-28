import path from "node:path";
import type { RequestHandler } from "express";
import multer from "multer";

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

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /.jpg|.jpeg|.png/;
    const extension = fileTypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    if (extension) return cb(null, true);
    cb(null, false);
  },
});

const single: RequestHandler = async (req, res, next) => {
  const imageProfileURL = `assets/images/userprofil/${req.file?.filename}`;
  res.status(200).json({ imageProfileURL });
};

export default { single, upload };
