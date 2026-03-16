import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const loadEvents = async () => {
    try {
      const res = await axios.get(
        "https://show-time-backend.onrender.com/api/admin/events",
        {
          withCredentials: true,
        },
      );
      const data = res.data.events || res.data.event || res.data || [];
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("EVENT FETCH FAILED ❌", err);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete Event?")) return;
    {
      try {
        await axios.delete(
          `https://show-time-backend.onrender.com/api/admin/events/${id}`,
          {
            withCredentials: true,
          },
        );
        toast.success("Movie Removed Successfully");
        loadEvents();
      } catch (error) {
        toast.error("Deleted failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-375 mx-auto bg-white shadow-xl rounded-2xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Event Management
            </h2>
            <p className="text-sm text-gray-500">Manage all platform events</p>
          </div>

          <button
            onClick={() => navigate("/admin/events/add")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            <AiOutlinePlus /> Add Event
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-3 py-3">#</th>
                <th className="px-3 py-3 w-40">Title</th>
                <th className="px-3 py-3 w-60">Description</th>
                <th className="px-3 py-3 w-60">Event Detail</th>
                <th className="px-3 py-3">Event Type</th>
                <th className="px-3 py-3">Language</th>
                <th className="px-3 py-3">Duration</th>
                <th className="px-3 py-3">Date</th>
                <th className="px-3 py-3">Time</th>
                <th className="px-3 py-3">Location</th>
                <th className="px-3 py-3">Price</th>
                <th className="px-3 py-3">Image</th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="13" className="text-center py-6 text-gray-400">
                    No Events Found
                  </td>
                </tr>
              ) : (
                events.map((e, index) => (
                  <tr
                    key={e._id}
                    className="border-t hover:bg-gray-50 transition align-top"
                  >
                    <td className="px-3 py-4">{index + 1}</td>

                    <td className="px-3 py-4 font-semibold text-gray-800">
                      {e.title}
                    </td>

                    {/* Description */}
                    <td className="px-3 py-4 max-w-xs">
                      <p className="text-gray-600 text-xs line-clamp-2">
                        {e.description}
                      </p>
                    </td>

                    {/* Event Detail */}
                    <td className="px-3 py-4 max-w-xs">
                      <p className="text-gray-600 text-xs line-clamp-2">
                        {e.eventDetail}
                      </p>
                    </td>

                    <td className="px-3 py-4">
                      <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full font-medium">
                        {e.eventType}
                      </span>
                    </td>

                    <td className="px-3 py-4">{e.language || "N/A"}</td>

                    <td className="px-3 py-4">{e.duration || "N/A"}</td>

                    <td className="px-3 py-4">
                      {new Date(e.date).toLocaleDateString("en-IN")}
                    </td>

                    <td className="px-3 py-4">{e.timing}</td>

                    <td className="px-3 py-4">{e.location}</td>

                    <td className="px-3 py-4 font-medium text-gray-700">
                      ₹{e.price}
                    </td>

                    <td className="px-3 py-4">
                      {e.image && (
                        <img
                          src={e.image}
                          alt="event"
                          className="w-20 h-14 object-cover rounded-lg border"
                        />
                      )}
                    </td>

                    <td className="px-3 py-4">
                      <div className=" ">
                        <button
                          onClick={() =>
                            navigate(`/admin/events/edit/${e._id}`)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition"
                        >
                          <AiOutlineEdit /> Edit
                        </button>

                        <button
                          onClick={() => deleteEvent(e._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1 transition mt-2"
                        >
                          <AiOutlineDelete /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
