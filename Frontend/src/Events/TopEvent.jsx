import { useNavigate } from "react-router-dom";
import { useSearch } from "../Context/SearchProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const TopEvent = () => {
  const { query } = useSearch();

  const [events, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);

  const filtered = events.filter((m) => m.title.toLowerCase().includes(query));
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          "https://show-time-backend.onrender.com/api/events",
        );
        setEvent(res.data);
      } catch (error) {
        toast.error("Activity are Not Feched");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  if (loading) {
    return <div className="py-10 text-center "></div>;
  }

  if (!events || events.length === 0) {
    return null;
  }

  if (query && filtered.length === 0) {
    return (
      <div className="min-h-screen flex my-24 justify-center text-2xl font-semibold text-black">
        No Events Found 😕
      </div>
    );
  }

  return (
    <div className="w-full  px-4 pb-4 md:px-8 lg:px-14 ">
      <h1 className="font-bold px-4 text-3xl md:text-4xl py-4">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((eve, index) => (
          <div
            className="w-80  rounded-lg cursor-pointer border border-gray-300 mx-4"
            key={index}
            onClick={() => navigate(`/event/${eve._id}`)}
          >
            <img
              src={eve?.image}
              alt={eve?.Title}
              className="rounded-tr-lg rounded-tl-lg object-fill h-90 w-90"
            />
            <p className="font-medium text-sm pl-4 bg-amber-300">
              {eve?.date && formatDate(eve.date)} {eve?.timing}
            </p>
            <p className="font-medium text-lg pl-4">{eve?.title}</p>
            <p className="pl-4 pb-1 text-sm text-gray-800 font-medium">
              {eve?.location}
            </p>
            <p className="pl-4 pb-1 text-sm text-gray-800 font-medium">
              ₹{eve?.price} onwards
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopEvent;
