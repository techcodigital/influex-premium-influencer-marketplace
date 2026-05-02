// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });

// const uploadVideo = multer({
//   storage, // 👈 use storage instead of dest

//   limits: {
//     fileSize: 100 * 1024 * 1024,
//   },

//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("video/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only video files allowed"), false);
//     }
//   },
// });

// export default uploadVideo;
import multer from "multer";
import fs from "fs";

// 🔥 correct path
const uploadPath = "public/uploads/videos";

// ensure folder exist
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

const uploadVideo = multer({
  storage,

  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files allowed"), false);
    }
  },
});

export default uploadVideo;