const StatsCard = ({ title, value, icon, gradient }) => {
  return (
    <div className={`p-6 rounded-xl shadow-lg flex items-center gap-4 text-white ${gradient}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
