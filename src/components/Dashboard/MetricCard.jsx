export default function MetricCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center gap-4">
      <div className="text-4xl">{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}