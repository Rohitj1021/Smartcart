import { usePantry } from '../contexts/PantryContext';
import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Pantry() {
  const { pantryItems, addItem, deleteItem } = usePantry();
  const [newItem, setNewItem] = useState({ name: '', quantity: 1, expiryDate: '', price: 0 });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.name) return toast.error('Please enter an item name');
    await addItem(newItem);
    setNewItem({ name: '', quantity: 1, expiryDate: '', price: 0 });
    toast.success('Item added successfully!');
  };

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return null;
    const daysLeft = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 3600 * 24));
    if (daysLeft < 0) return { text: 'Expired', color: 'red' };
    if (daysLeft <= 3) return { text: `Expires in ${daysLeft} days`, color: 'orange' };
    return { text: `Expires in ${daysLeft} days`, color: 'green' };
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Pantry</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your food inventory</p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input type="text" placeholder="Item name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none transition-all" required />
          <input type="number" placeholder="Quantity" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
          <input type="date" value={newItem.expiryDate} onChange={e => setNewItem({ ...newItem, expiryDate: e.target.value })} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
          <input type="number" step="0.01" placeholder="Price (₹)" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: parseFloat(e.target.value) })} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all flex items-center justify-center gap-2"> <PlusIcon className="w-5 h-5" /> Add Item </button>
        </form>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pantryItems.map((item) => {
                const expiryStatus = getExpiryStatus(item.expiryDate);
                return (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {item.expiryDate && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${expiryStatus.color}-100 text-${expiryStatus.color}-800`}>
                          {expiryStatus.text}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ₹{item.price?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => deleteItem(item.id)} className="text-red-600 hover:text-red-900 transition-colors"> <TrashIcon className="w-5 h-5" /> </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}