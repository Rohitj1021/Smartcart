import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, PlusIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// TODO: Replace with your actual data from Firestore
const initialShoppingItems = [
  { id: 1, name: 'Avocados', completed: false },
  { id: 2, name: 'Greek Yogurt', completed: false },
  { id: 3, name: 'Whole Grain Bread', completed: false },
];

export default function ShoppingListPage() {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setItems(initialShoppingItems);
  }, []);

  const addItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const newItem = { id: Date.now(), name: newItemName, completed: false };
    setItems([...items, newItem]);
    setNewItemName('');
  };

  const toggleComplete = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const completedCount = items.filter(item => item.completed).length;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Shopping List</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Organize your groceries and track what you need</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search items..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
        </div>
        <form onSubmit={addItem} className="flex gap-2 w-full md:w-auto">
          <input type="text" placeholder="Add new item..." value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="flex-1 md:w-64 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all flex items-center gap-2 whitespace-nowrap"> <PlusIcon className="w-5 h-5" /> Add </button>
        </form>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Progress</span>
            <span className="text-sm text-gray-500">{completedCount} / {items.length} completed</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: `${items.length ? (completedCount / items.length) * 100 : 0}%` }} />
          </div>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {filteredItems.length === 0 ? <div className="text-center py-12 text-gray-500">No items found</div> : filteredItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors group">
              <div className="flex items-center gap-3 flex-1">
                <button onClick={() => toggleComplete(item.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${item.completed ? 'bg-green-600 border-green-600' : 'border-gray-300 hover:border-green-500'}`}>
                  {item.completed && <CheckCircleIcon className="w-4 h-4 text-white" />}
                </button>
                <span className={`text-gray-800 dark:text-white ${item.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>{item.name}</span>
              </div>
              <button onClick={() => deleteItem(item.id)} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}