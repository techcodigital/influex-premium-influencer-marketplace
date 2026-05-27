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
  budget
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

Requirements:
- Modern and catchy
- Professional brand campaign style
- Short and engaging
- Social media friendly
- Influencer marketplace vibe

Return ONLY valid JSON array like:
["title1","title2","title3","title4","title5"]`,
      },
    ],

    max_tokens: 200,
  });

  const content = response.choices[0].message.content;

  return JSON.parse(content);
};
