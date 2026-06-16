import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon, 
  SparklesIcon,
  HeartIcon, 
  TruckIcon 
} from '@heroicons/react/24/outline';

const spendingData = [
  { month: 'Jan', current: 85, previous: 90 },
  { month: 'Feb', current: 78, previous: 82 },
  { month: 'Mar', current: 92, previous: 88 },
  { month: 'Apr', current: 70, previous: 75 },
];

export default function AnalyticsPage() {
  const InsightCard = ({ icon, title, value, change, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>{icon}</div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <ArrowTrendingUpIcon className="w-4 h-4" /> : <ArrowTrendingDownIcon className="w-4 h-4" />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{title}</p>
    </div>
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track your savings, waste reduction, and eating habits</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard 
          icon={<ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />} 
          title="Monthly Spending" 
          value="₹325" 
          change={-15} 
          color="green" 
        />
        <InsightCard 
          icon={<SparklesIcon className="w-5 h-5 text-emerald-600" />} 
          title="Food Waste" 
          value="2.4 kg" 
          change={-30} 
          color="emerald" 
        />
        <InsightCard 
          icon={<HeartIcon className="w-5 h-5 text-rose-600" />} 
          title="Healthy Eating" 
          value="84%" 
          change={12} 
          color="rose" 
        />
        <InsightCard 
          icon={<TruckIcon className="w-5 h-5 text-blue-600" />} 
          title="Delivery Orders" 
          value="6" 
          change={-8} 
          color="blue" 
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Spending vs Previous Month</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" className="text-xs fill-gray-500" />
                <YAxis className="text-xs fill-gray-500" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value}`, 'Amount']}
                />
                <Bar dataKey="current" fill="#10b981" radius={[4, 4, 0, 0]} name="Current Month" />
                <Bar dataKey="previous" fill="#9ca3af" radius={[4, 4, 0, 0]} name="Previous Month" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-sm p-6 border border-purple-100 dark:border-purple-800">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">AI Spending Insight</h3>
            <p className="text-gray-600 dark:text-gray-300">You spend 25% more on weekends. Try shopping on Wednesdays for better deals.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-sm p-6 border border-blue-100 dark:border-blue-800">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Nutrition Overview</h3>
            <p className="text-gray-600 dark:text-gray-300">Your protein intake is optimal, but consider adding more fiber-rich foods.</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-sm p-6 border border-green-100 dark:border-green-800">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Waste Prediction</h3>
            <p className="text-gray-600 dark:text-gray-300">With current habits, you'll prevent 4.2kg of waste next month.</p>
          </div>
        </div>
      </div>
    </div>
  );
}