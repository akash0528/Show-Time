import { useNavigate } from "react-router-dom";
import { useSearch } from "../Context/SearchProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const Activity = () => {
  const { query } = useSearch();

  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const filtered = activity.filter((m) =>
    m.title.toLowerCase().includes(query),
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(
          "https://show-time-backend.onrender.com/api/activity",
        );
        setActivity(res.data);
      } catch (error) {
        toast.error("Activity are not Fetched");
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex my-24 justify-center text-2xl font-semibold text-black">
        Loading Activities...
      </div>
    );
  }

  if (query && filtered.length === 0) {
    return (
      <div className="min-h-screen flex my-24 justify-center text-2xl font-semibold text-black">
        No Activity Found 😕
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="w-full  px-4 pb-4 md:px-8 lg:px-14">
          {!query && activity.length > 0 && (
            <h1 className="font-bold text-3xl md:text-4xl pt-2 px-4">
              All Activities
            </h1>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {filtered.map((eve, index) => (
              <div
                className="w-80 rounded-lg cursor-pointer border border-gray-300 mx-4 mt-4"
                key={index}
                onClick={() => navigate(`/activity/${eve._id}`)}
              >
                <img
                  src={eve.image}
                  alt={eve.title}
                  className="rounded-tr-lg rounded-tl-lg object-fill h-90 w-90"
                />
                <p className="font-medium text-sm pl-4 bg-amber-300">
                  {eve.timing}
                </p>
                <p className="font-medium text-lg pl-4 md:text-base">
                  {eve.title}
                </p>
                <p className="pl-4 pb-1 text-sm text-gray-800 font-medium">
                  {eve.location}
                </p>
                <p className="pl-4 pb-1 text-sm text-gray-800 font-medium">
                  ₹{eve.price} onwards
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
