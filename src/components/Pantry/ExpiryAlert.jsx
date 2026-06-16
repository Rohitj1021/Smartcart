export default function ExpiryAlert({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
      <p className="font-bold text-red-700">⚠️ Expiring soon:</p>
      <ul className="list-disc ml-6">
        {items.map((item) => (
          <li key={item.id}>
            {item.name} – expires {new Date(item.expiryDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}