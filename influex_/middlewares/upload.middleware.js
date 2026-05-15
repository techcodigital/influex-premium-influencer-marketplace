import multer from "multer";
import fs from "fs";
import path from "path";

// 📁 folders (ABSOLUTE SAFE PATH)
const BASE_DIR = path.join(process.cwd(), "public/uploads");

const paths = {
  profile: path.join(BASE_DIR, "profiles"),
  image: path.join(BASE_DIR, "images"),
  video: path.join(BASE_DIR, "videos"),
};

// ensure all folders exist
Object.values(paths).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = paths.image; // default

    // image/video detect
    if (file.mimetype.startsWith("image/")) {
      // safer check than baseUrl
      if (req.path.includes("profile")) {
        folder = paths.profile;
      } else {
        folder = paths.image;
      }
    } 
    else if (file.mimetype.startsWith("video/")) {
      folder = paths.video;
    }

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.random().toString(36).substring(2, 10) + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export default upload;
