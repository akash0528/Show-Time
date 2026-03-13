

const ActivityTable = ({ activities = [] }) => {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl shadow-lg">
      <table className="min-w-full bg-white rounded-xl">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-3 uppercase text-gray-500">Title</th>
            <th className="text-left px-6 py-3 uppercase text-gray-500">Date</th>
            <th className="text-left px-6 py-3 uppercase text-gray-500">Location</th>
            <th className="text-left px-6 py-3 uppercase text-gray-500">Price</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((act, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <td className="px-6 py-4">{act.Title}</td>
              <td className="px-6 py-4">{act.Date}</td>
              <td className="px-6 py-4">{act.Location}</td>
              <td className="px-6 py-4">{act.Price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
