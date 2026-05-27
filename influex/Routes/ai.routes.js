import express from "express";
import { generateInfluencerBio } from "../services/aiService.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/generate-bio", auth, async (req, res) => {
  try {
    const { name, category, subcategory, followers } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        message: "Name and category are required",
      });
    }

    const bio = await generateInfluencerBio(
      name,
      category,
      subcategory,
      followers
    );

    res.status(200).json({
      success: true,
      bio,
    });
  } catch (error) {
    res.status(500).json({
      message: "AI service error",
      error: error.message,
    });
  }
});

export default router;
