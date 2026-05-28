import express from "express";
import { generateInfluencerBio,suggestCampaignTitles } from "../services/aiService.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/generate-bio", auth, async (req, res) => {
  try {
    const { name, categories,subCategories, followers } = req.body;

    if (!name || !categories) {
      return res.status(400).json({
        message: "Name and category are required",
      });
    }

    const bio = await generateInfluencerBio(
      name,
     categories,
     subCategories,
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
router.post(
  "/campaign-titles",
  auth,
  async (req, res) => {
    try {
      const {
        categories,
        title,
        subCategories,
        city,
        budget,
      } = req.body;

      if (
        !categories ||
        !subCategories ||
        !budget || !title
      ) {
        return res.status(400).json({
          message:
            "Categories, subCategories and budget are required",
        });
      }

      const titles = await suggestCampaignTitles(
        categories,
        subCategories,
        city,
        budget,
        title
      );

      res.status(200).json({
        success: true,
        titles,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "AI error",
        error: error.message,
      });
    }
  }
);

export default router;
