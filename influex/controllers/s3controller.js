for (let file of files) {
  const inputPath = file.path;

  // VIDEO
  if (file.mimetype.startsWith("video/")) {

    const compressedDir = path.join(
      process.cwd(),
      "public/uploads/compressed"
    );

    if (!fs.existsSync(compressedDir)) {
      fs.mkdirSync(compressedDir, { recursive: true });
    }

    const fileName = `${path.parse(file.filename).name}.mp4`;

    const outputPath = path.join(compressedDir, fileName);

    await compressVideo(inputPath, outputPath);

    const url = `${BASE_URL}/uploads/compressed/${fileName}`;

    videoUrls.push(url);

    if (fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }
  }

  // IMAGE
  if (file.mimetype.startsWith("image/")) {
    const url = `${BASE_URL}/uploads/images/${file.filename}`;
    imageUrls.push(url);
  }
} // ✅ ye missing tha

const newPost = await Video.create({
  user: req.user._id,
  urls: videoUrls,
  images: imageUrls,
  caption: req.body.caption || "",
});
