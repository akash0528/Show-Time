const Info = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
      <p className="text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Info;
