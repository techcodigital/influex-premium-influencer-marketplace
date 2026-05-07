// import multer from "multer";
// import fs from "fs";

// const uploadPath = "public/uploads/videos";
// fs.mkdirSync(uploadPath, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   },
// });

// const uploadVideo = multer({
//   storage,
//   limits: { fileSize: 100 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     file.mimetype.startsWith("video/")
//       ? cb(null, true)
//       : cb(new Error("Only videos allowed"));
//   },
// });

// export default uploadVideo;
