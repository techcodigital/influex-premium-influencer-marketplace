import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// absolute paths (IMPORTANT)
const BASE_UPLOAD = path.join(__dirname, "../public/uploads");

const paths = {
  profile: path.join(BASE_UPLOAD, "profiles"),
  image: path.join(BASE_UPLOAD, "images"),
  video: path.join(BASE_UPLOAD, "videos"),
};

// ensure folders exist
Object.values(paths).forEach((p) => {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, paths.image);
    }

    if (file.mimetype.startsWith("video/")) {
      return cb(null, paths.video);
    }

    return cb(new Error("Unsupported file type"), null);
  },

  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    const uniqueName = `${Date.now()}-${safeName}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024  },

});

export default upload;
