import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, 
});

export const generateInfluencerBio = async (
  name,
  categories,
  subCategories,
  followers
) => {
  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [
      {
        role: "user",
        content: `Write a professional influencer bio for:

Name: ${name}
Category: ${categories}
Subcategory: ${subCategories}
Followers: ${followers}
Requirements:
- Under 80 words
- Modern and engaging tone
- Include niche expertise
- Sound professional and brand-friendly
- Add emojis if suitable`,
      },
    ],
    max_tokens: 200,
  });
   return response.choices[0].message.content;
};

export const suggestCampaignTitles = async (
  categories,
  subCategories,
  city,
  budget,
  title
) => {
  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free",

    messages: [
      {
        role: "user",

        content: `Suggest 5 premium influencer campaign titles.

Categories: ${categories?.join(", ")}
Subcategories: ${subCategories?.join(", ")}
City: ${city}
Budget: ₹${budget}
title: ${title}

Requirements:
- Modern and catchy
- Professional campaign description style
- Short, engaging, and premium tone
- Influencer marketplace vibe
- Suitable for brand collaborations
- Social media friendly
- Mention creator growth, brand deals, or paid promotions
- Keep it concise and attractive

Return ONLY valid JSON array like:
["description1","description2","description3","description4","description5"]`,
      },
    ],

    max_tokens: 200,
  });

  const content = response.choices[0].message.content;

  return JSON.parse(content);
};
