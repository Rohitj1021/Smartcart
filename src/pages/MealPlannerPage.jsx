import { useState } from 'react';
import { SparklesIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const weeklyPlan = [
  { day: 'Monday', meal: 'Dinner Scheduled', time: '25 min', calories: 420, completed: false },
  { day: 'Tuesday', meal: 'Lunch Scheduled', time: '30 min', calories: 380, completed: false },
  { day: 'Wednesday', meal: 'Breakfast Scheduled', time: '20 min', calories: 320, completed: false },
  { day: 'Thursday', meal: 'Dinner Scheduled', time: '25 min', calories: 420, completed: false },
  { day: 'Friday', meal: 'Lunch Scheduled', time: '30 min', calories: 380, completed: false },
  { day: 'Saturday', meal: 'Breakfast Scheduled', time: '20 min', calories: 320, completed: false },
  { day: 'Sunday', meal: 'Rest Day', time: '', calories: 0, completed: false }
];

export default function MealPlannerPage() {
  const [plan] = useState(weeklyPlan);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('New meal plan generated!');
    }, 1500);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Meal Planner</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Plan your weekly meals and reduce food waste</p>
        </div>
        <button onClick={generatePlan} disabled={isGenerating} className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          <SparklesIcon className="w-5 h-5" /> {isGenerating ? 'Generating...' : 'Generate AI Plan'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {plan.map((day) => (
          <div key={day.day} className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border p-5 transition-all hover:shadow-md hover:-translate-y-1 ${day.completed ? 'border-green-300 dark:border-green-700' : 'border-gray-100 dark:border-gray-700'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">{day.day}</h3>
              {day.completed && <div className="w-2 h-2 rounded-full bg-green-500" />}
            </div>
            {day.meal !== 'Rest Day' ? (
              <div className="space-y-3">
                <p className="text-gray-700 dark:text-gray-300 font-medium">{day.meal}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1"><ClockIcon className="w-4 h-4" /><span>{day.time}</span></div>
                  <div className="flex items-center gap-1"><span>🔥</span><span>{day.calories} cal</span></div>
                </div>
                <button className="w-full mt-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">View Recipe</button>
              </div>
            ) : (
              <div className="text-center py-6"><CalendarIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" /><p className="text-gray-400">Take a break!</p></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}