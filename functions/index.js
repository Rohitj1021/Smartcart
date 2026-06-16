const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { generateMealPlanHandler, getRecipeSuggestionsHandler, predictPriceHandler } = require('./services/geminiAI');

admin.initializeApp();

exports.generateMealPlan = functions.https.onCall(generateMealPlanHandler);
exports.getRecipeSuggestions = functions.https.onCall(getRecipeSuggestionsHandler);
exports.predictPrice = functions.https.onCall(predictPriceHandler);