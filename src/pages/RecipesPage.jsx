import { useState } from 'react';
import { MagnifyingGlassIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline';

// Mock data – replace with your AI-generated recipes
const recipes = [
  { id: 1, name: 'Banana Oat Pancakes', rating: 4.7, match: 92, mealType: 'Breakfast', prepTime: 15 },
  { id: 2, name: 'Chicken Stir Fry', rating: 4.5, match: 85, mealType: 'Lunch', prepTime: 20 },
  { id: 3, name: 'Pasta with Tomato Sauce', rating: 4.3, match: 78, mealType: 'Dinner', prepTime: 25 },
];

export default function RecipesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');

  const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) && (!selectedMealType || recipe.mealType === selectedMealType));

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Recipes</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Discover delicious recipes based on your pantry</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setSelectedMealType('')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedMealType ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>All</button>
          <button onClick={() => setSelectedMealType('Breakfast')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedMealType === 'Breakfast' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Breakfast</button>
          <button onClick={() => setSelectedMealType('Lunch')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedMealType === 'Lunch' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Lunch</button>
        </div>
        <div className="relative w-full md:w-64">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search recipes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden card-hover group">
            <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 relative flex items-center justify-center">
              <FireIcon className="w-16 h-16 text-green-600 opacity-20" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-green-700">{recipe.match}% match</div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-xl text-gray-800 dark:text-white">{recipe.name}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{recipe.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /><span>{recipe.prepTime} min</span></div>
              </div>
              <button className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all group relative overflow-hidden">Cook Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}