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
    model: "google/gemma-2-9b-it:free",
    messages: [
      {
        role: "user",
        content: `Write a professional influencer bio for:

Name: ${name}
Category: ${categories}
Subcategory: ${subCategories}
Followers: ${followers}

Keep it under 100 words, engaging and professional.`,
      },
    ],
    max_tokens: 200,
  });

  return response.choices[0].message.content;
};
