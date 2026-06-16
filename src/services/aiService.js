import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export const aiService = {
  generateMealPlan: async (pantryItems) => {
    const func = httpsCallable(functions, 'generateMealPlan');
    const result = await func({ pantry: pantryItems });
    return result.data;
  },
  getRecipeSuggestions: async (ingredients) => {
    const func = httpsCallable(functions, 'getRecipeSuggestions');
    const result = await func({ ingredients });
    return result.data;
  },
  predictPrice: async (itemName) => {
    const func = httpsCallable(functions, 'predictPrice');
    const result = await func({ itemName });
    return result.data;
  }
};