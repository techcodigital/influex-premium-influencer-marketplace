// import multer from "multer";
// import multerS3 from "multer-s3";
// import { s3 } from "../config/s3.js";

// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: "influex-profile-images",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: (req, file, cb) => {
//       cb(null, `profiles/${Date.now()}-${file.originalname}`);
//     },
//   }),

//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },

//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only images allowed"), false);
//     }
//   },
// });

// export default upload;
import multer from "multer";
import path from "path";
import fs from "fs";

// 🔥 ensure folder exist
const uploadPath = "public/uploads/profiles";
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"), false);
    }
  },
});

export default upload;