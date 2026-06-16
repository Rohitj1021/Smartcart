const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function callGemini(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

exports.generateMealPlanHandler = async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Must be logged in');
  const { pantry } = data;
  const prompt = `Create a weekly meal plan using these ingredients: ${pantry.map(i => i.name).join(', ')}. 
  Return as JSON: { "monday": "breakfast, lunch, dinner", ... }`;
  const plan = await callGemini(prompt);
  return { plan: JSON.parse(plan) };
};

exports.getRecipeSuggestionsHandler = async (data) => {
  const { ingredients } = data;
  const prompt = `Suggest 3 recipes using: ${ingredients.join(', ')}. Return JSON array with name, missingIngredients, instructions.`;
  const recipes = await callGemini(prompt);
  return { recipes: JSON.parse(recipes) };
};

exports.predictPriceHandler = async (data) => {
  const { itemName } = data;
  const prompt = `Predict current market price for ${itemName} in USD. Return only a number.`;
  const price = await callGemini(prompt);
  return { price: parseFloat(price) };
};