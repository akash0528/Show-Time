import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Calendar, MapPin, Bookmark, Timer, Ticket } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
import { ClipLoader } from "react-spinners";

const ActivityNav = () => {
  const [count, setCount] = useState(0);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const fetchActivtity = async () => {
      try {
        const res = await axios.get(
          `https://show-time-backend.onrender.com/api/activity/${id}`,
        );
        setActivity(res.data);
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error("Activity not found");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchActivtity();
  }, [id]);

  const handleIncrease = () => {
    setCount((c) => c + 1);
  };

  const handleDecrease = () => {
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
        "https://show-time-backend.onrender.com/auth/bookings",
        {
          item: id,
          itemType: "AdminActivity",
          ticket: count,
          totalAmount: count * activity.price,
        },
        { withCredentials: true },
      );

      setCount(0);
      toast.success("Ticket Successfully Booked");
      navigate("/Booking");
    } catch (error) {
      toast.error("Ticket Not Booked");
    }
  };

  if (loading) {
    return (
      <p className="min-h-screen text-center text-xl">
        <ClipLoader loading={true} />
      </p>
    );
  }

  return (
    <>
      <div className="w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-15 p-4 ">
          <div>
            <img
              src={activity?.image}
              alt={activity?.title}
              className=" w-full
              h-65 sm:h-80 md:h-105 lg:w-178 lg:h-115 lg:ml-25 rounded-xl object-fill
              border shadow-blue-700"
            />
          </div>
          <div className="w-full ">
            <div className="w-full lg:ml-30 lg:w-100 h-auto lg:h-75 border border-gray-200 rounded-lg p-4 ">
              <h1 className="font-bold text-lg"> {activity?.title} </h1>

              <div className="flex p-1 ">
                <Bookmark />
                <p className="text-md font-medium ml-2">{activity?.title}</p>
              </div>

              <div className="flex p-1">
                <Calendar size={22} />
                <p className="text-md font-medium ml-2">{activity?.timing}</p>
              </div>

              <div className="flex p-1">
                <MapPin size={22} />
                <p className="text-md font-medium ml-2">
                  {activity?.location}{" "}
                </p>
              </div>

              <hr className="my-2" />
              <div className="flex justify-between items-center gap-4 p-2">
                <div className=" ">
                  <p className="font-bold">Starts from</p>
                  <p className="font-bold">₹{activity?.price}</p>
                </div>

                {count === 0 ? (
                  <button
                    className="bg-black text-white px-8 py-3 rounded-lg text-lg  cursor-pointer"
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
                        className="w-8 h-10 flex items-center justify-center text-xl font-bold text-white bg-black"
                        onClick={handleDecrease}
                      >
                        {" "}
                        −{" "}
                      </button>

                      <span className="w-8 h-10 flex items-center justify-center text-xl font-bold text-white bg-black">
                        {count}
                      </span>

                      <button
                        className="w-8 h-10 flex items-center justify-center text-xl font-bold text-white bg-black"
                        onClick={handleIncrease}
                      >
                        +{" "}
                      </button>
                    </div>

                    <button
                      className="bg-black text-white px-6 py-2 rounded-lg ml-2 cursor-pointer"
                      onClick={handleBookTicket}
                    >
                      Proceed ₹{count * activity?.price}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:ml-30 lg:w-100 h-auto lg:h-38 border border-gray-200 rounded-lg p-4 mt-4 ">
              <h1 className="text-md font-medium ml-2">Event Guide</h1>
              <hr className="my-2" />

              <div className="flex p-1 pt-3  items-center">
                <Ticket />
                <p className="text-md font-medium ml-2">
                  {activity?.ageLimits}
                </p>
              </div>

              <div className="flex p-1 pt-3  items-center">
                <Timer />
                <p className="text-md font-medium ml-2">{activity?.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-90 lg:w-180 mx-auto border border-gray-200 shadow-2xl mb-4 rounded-lg p-4 lg:ml-28">
          <h1 className=" text-3xl font-bold">About The Event </h1>

          <p className="text-md font-medium p-1">{activity?.description}</p>
        </div>
      </div>
    </>
  );
};

export default ActivityNav;
