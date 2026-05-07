import fs from "fs";
import path from "path";
import Video from "../models/video.js";

export const uploadPost = async (req, res) => {
  try {
    const files = req.files;
    const uploadedVideoUrls = [];

    const BASE_URL = "https://api.collabzy.in";

    // 🎥 VIDEOS
    if (files && files.length > 0) {
      for (let file of files) {
        const videoUrl = `${BASE_URL}/uploads/videos/${file.filename}`;
        uploadedVideoUrls.push(videoUrl);
      }
    }

    // 🖼 IMAGES
    const imageUrls = req.body.images || [];

    const newPost = await Video.create({
      user: req.user._id,
      urls: uploadedVideoUrls,
      images: imageUrls,
      caption: req.body.caption || "",
    });

  res.json({
        success: true,
        data: {
         url,
        },
        });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Video.find()
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    const formatted = posts.map(post => ({
      ...post._doc,
      media: [
        ...(post.images || []),
        ...(post.urls || [])
      ]
    }));

    res.json({ success: true, data: formatted });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET /posts/:userId
export const getPostsByUser = async (req, res) => {
  try {
    const posts = await Video.find({ user: req.params.userId })
      .populate("user", "name profileImage")
      .sort({ createdAt: -1 });

    const formatted = posts.map(post => ({
      ...post._doc,
      media: [
        ...(post.images || []),
        ...(post.urls || [])
      ]
    }));

    res.json({
      success: true,
      data: formatted
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    const post = await Video.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });

    await post.deleteOne();

    res.json({
      success: true,
      message: "Deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updatePost = async (req, res) => {
  try {
    const post = await Video.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Not found" });

    const BASE_URL = "https://api.collabzy.in";

    let uploadedVideoUrls = [...(post.urls || [])];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const url = `${BASE_URL}/uploads/videos/${file.filename}`;
        uploadedVideoUrls.push(url);
      }
    }

    post.caption = req.body.caption || post.caption;
    post.images = req.body.images || post.images;
    post.urls = uploadedVideoUrls;

    await post.save();

    res.json({
      success: true,
      message: "Updated successfully",
      data: post,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
