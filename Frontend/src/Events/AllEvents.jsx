import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Calendar, MapPin, MicVocal, Languages, Timer } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";

const AllEvents = () => {
  const [count, setCount] = useState(0);
  const [events, setEvents] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvents(res.data);
      } catch (error) {
        toast.error("Event Not Found");
      }
    };
    fetchAllEvents();
  }, [id]);

  const handleIncrease = () => {
    setCount((c) => c + 1);
  };

  const handleDecrase = () => {
    setCount((c) => (c > 1 ? c - 1 : 0));
  };

  const handleBookTicket = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.warning("Please signin");
      navigate("/signin");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/bookings",
        {
          item: id,
          itemType: "AdminEvent",
          ticket: count,
          totalAmount: count * events.price,
        },
        { withCredentials: true },
      );

      setCount(0);
      toast.success(` Ticket Book Successfully`);
      navigate("/Booking");
    } catch (error) {
      toast.error("Ticket Not Booked");
    }
  };
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  if (!events) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  return (
    <>
      <div className="w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-15 p-4 ">
          <div>
            <img
              src={events?.image}
              alt={events?.title}
              className="w-full
              h-65 sm:h-80 md:h-105 lg:w-178 lg:h-115 lg:ml-25 rounded-xl object-fill
              border shadow-blue-700"
            />
          </div>
          <div className="w-full ">
            <div className="w-full lg:ml-30 lg:w-100 h-auto lg:h-75 border border-gray-200 rounded-lg p-4 ">
              <h1 className="font-bold text-lg"> {events?.eventDetail} </h1>

              <div className="flex p-1 ">
                <MicVocal size={22} />
                <p className="text-md font-medium ml-2">{events?.eventType}</p>
              </div>

              <div className="flex p-1">
                <Calendar size={22} />
                <p className="text-md font-medium ml-2">
                  {events?.date && formatDate(events.date)},{events?.timing}
                </p>
              </div>

              <div className="flex p-1">
                <MapPin size={22} />
                <p className="text-md font-medium ml-2">{events?.location}</p>
              </div>

              <hr />
              <div className="flex justify-between gap-4 p-2">
                <div className=" ">
                  <p className="font-bold">Starts from</p>
                  <p className="font-bold">₹{events?.price}</p>
                </div>

                <div className="mt-1">
                  {count === 0 ? (
                    <button
                      className="bg-black text-white px-8 py-3 rounded-lg text-lg cursor-pointer"
                      onClick={() => {
                        setCount(1);
                      }}
                    >
                      Book Tickets
                    </button>
                  ) : (
                    <div className="flex items-center gap-4">
                      <div className="flex  w-20 rounded-lg overflow-hidden">
                        <button
                          className="w-8 h-10 text-xl rounded-l-lg text-white bg-black cursor-pointer"
                          onClick={handleDecrase}
                        >
                          {" "}
                          −{" "}
                        </button>

                        <span className="text-xl font-bold w-8 text-center pt-1 text-white bg-black cursor-pointer">
                          {count}
                        </span>

                        <button
                          className="w-8 h-10 bg-black text-white text-xl rounded-r-lg cursor-pointer"
                          onClick={handleIncrease}
                        >
                          +{" "}
                        </button>
                      </div>

                      <button
                        className="bg-black text-white px-6 py-2 rounded-lg ml-2 cursor-pointer"
                        onClick={handleBookTicket}
                      >
                        Proceed ₹{count * events?.price}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full lg:ml-30 lg:w-100 h-auto lg:h-38 border border-gray-200 rounded-lg p-4 mt-4 ">
              <h1 className="text-md font-medium ml-2">Event Guide</h1>
              <hr className="my-2" />

              <div className="flex p-1 pt-3">
                <Languages />
                <p className="text-md font-medium ml-2">{events?.language}</p>
              </div>

              <div className="flex p-1 pt-3">
                <Timer />
                <p className="text-md font-medium ml-2">{events?.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-90 lg:w-180 mx-auto border border-gray-200 shadow-2xl mb-4 rounded-lg p-4 lg:ml-28">
          <h1 className=" text-3xl font-bold">About The Event </h1>

          <p className="text-md font-medium p-1">{events?.description}</p>
        </div>
      </div>
    </>
  );
};

export default AllEvents;
