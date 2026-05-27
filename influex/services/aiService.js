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
export const suggestCampaignTitles = async (
  brand,
  product,
  goal
) => {
  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b:free",
    messages: [
      {
        role: "user",
        content: `Suggest 5 premium and catchy influencer campaign titles.

Brand: ${brand}
Product: ${product}
Goal: ${goal}

Requirements:
- Modern and trendy
- Brand collaboration style
- Short and engaging
- Suitable for social media campaigns

Return ONLY a valid JSON array like:
["title1","title2","title3","title4","title5"]`,
      },
    ],
    max_tokens: 200,
  });

  const content = response.choices[0].message.content;

  return JSON.parse(content);
};
  return response.choices[0].message.content;
};
