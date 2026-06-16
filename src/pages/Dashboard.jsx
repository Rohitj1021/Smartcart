import { usePantry } from '../contexts/PantryContext';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarIcon, CurrencyRupeeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

// Static waste data (kg per day)
const wasteData = [
  { day: 'Mon', waste: 0.5 }, { day: 'Tue', waste: 0.3 }, { day: 'Wed', waste: 0.8 },
  { day: 'Thu', waste: 0.4 }, { day: 'Fri', waste: 0.6 }, { day: 'Sat', waste: 0.2 },
  { day: 'Sun', waste: 0.1 }
];

export default function Dashboard() {
  const { pantryItems, loading } = usePantry();
  const [expiringItems, setExpiringItems] = useState([]);
  const totalValue = pantryItems.reduce((sum, i) => sum + (i.price || 0), 0);

  useEffect(() => {
    const expiring = pantryItems.filter(item => {
      if (!item.expiryDate) return false;
      const daysLeft = (new Date(item.expiryDate) - new Date()) / (1000 * 3600 * 24);
      return daysLeft <= 3 && daysLeft > 0;
    });
    setExpiringItems(expiring);
  }, [pantryItems]);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  const MetricCard = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900/20`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ExpiryCard = ({ item }) => {
    const daysLeft = Math.ceil((new Date(item.expiryDate) - new Date()) / (1000 * 3600 * 24));
    const urgencyColor = daysLeft <= 1 ? 'red' : daysLeft <= 3 ? 'yellow' : 'green';
    return (
      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 card-hover">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full bg-${urgencyColor}-500`} />
          <div>
            <p className="font-medium text-gray-800 dark:text-white">{item.name}</p>
            <p className="text-xs text-gray-500">Expires in {daysLeft} days</p>
          </div>
        </div>
        <span className={`text-sm font-medium text-${urgencyColor}-600`}>⚠️</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's what's happening with your pantry.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Items" value={pantryItems.length} icon={<CalendarIcon className="w-6 h-6 text-green-600" />} color="green" />
        <MetricCard title="Est. Value" value={`₹${totalValue.toFixed(2)}`} icon={<CurrencyRupeeIcon className="w-6 h-6 text-blue-600" />} color="blue" />
        <MetricCard title="Waste Saved" value="2.3 kg" icon={<ChartBarIcon className="w-6 h-6 text-purple-600" />} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Weekly Waste Reduction (kg)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={wasteData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="day" className="text-xs fill-gray-500" />
                <YAxis className="text-xs fill-gray-500" />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none' }} />
                <Area type="monotone" dataKey="waste" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Expiring Soon</h3>
          {expiringItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">✨ No items expiring soon!</p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {expiringItems.map(item => <ExpiryCard key={item.id} item={item} />)}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">🤖 AI Insight</h3>
            <p className="text-emerald-50 mt-2 max-w-md">
              Based on your shopping patterns, you could save <strong>₹3,800 per month</strong> by buying bulk for non‑perishable items.
            </p>
            <button className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 transition-all">
              View Details →
            </button>
          </div>
          <div className="text-4xl">📊</div>
        </div>
      </div>
    </div>
  );
}