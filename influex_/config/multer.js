// import { S3Client } from "@aws-sdk/client-s3";

// export const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//   },
// // });
// import { S3Client } from "@aws-sdk/client-s3";

// export const s3 = new S3Client({
//   region: process.env.AWS_REGION?.trim(),
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID?.trim(),
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY?.trim(),
//   },
// }); //console.log("AWS keys:", process.env.AWS_ACCESS_KEY,
//  process.env.AWS_SECRET_KEY, process.env.AWS_REGION);
import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/uploads/videos",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadVideo = multer({
  storage,

  limits: {
    fileSize: 100 * 1024 * 1024,
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