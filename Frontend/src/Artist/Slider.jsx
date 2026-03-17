import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const EventSlider = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://show-time-backend.onrender.com/api/home/feature`,
      );
      const sortedData = res.data
        .filter((item) => item.artistName)
        .concat(res.data.filter((item) => !item.artistName));
      setAllData(sortedData);
    } catch (error) {
      toast.error("Library sync failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // 👉 step 1
  const handleBooking = (item) => {
    if (item.artistName) {
      navigate(`/artist/${item._id}`);
    } else if (item.title) {
      navigate(`/activity/${item._id}`);
    } else if (item.title) {
      navigate(`/event${item._id}`);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  if (loading) {
    return (
      <p className="min-h-screen text-center text-xl">
        <ClipLoader loading={true} />
      </p>
    );
  }

  return (
    <div className=" relative">
      {/* ✅ Left Arrow */}
      <div className="hidden md:block absolute left-5 z-20 top-1/2 -translate-y-1/2">
        <button className="custom-prev  shadow-md hover:bg-gray-200 rounded-full p-3 transition cursor-pointer ml-4 bg-transparent">
          <FaArrowLeft size={20} className="text-black" />
        </button>
      </div>

      {/* ✅ Right Arrow */}
      <div className="hidden md:block absolute right-5 z-20 top-1/2 -translate-y-1/2">
        <button className="custom-next bg-transparent  shadow-md hover:bg-gray-200 rounded-full p-3 transition cursor-pointer ">
          <FaArrowRight size={20} className="text-black" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={allData.length > 2}
      >
        {allData.map((event) => (
          <SwiperSlide key={event._id}>
            <div className="flex  md:flex-row items-center justify-between bg-linear-to-r from-purple-400 via-pink-500 to-red-500 text-white px-4 md:px-12 py-10 gap-8 ">
              {/* Left side text */}
              <div className="md:w-1/2 space-y-3 md:space-y-4 text-center md:text-left md:ml-20 ">
                <h2 className="md:text-4xl text-xl font-bold text-gray-800">
                  {event.title}
                </h2>
                <p className="text-gray-800 text-sm md:text-2xl ">
                  {event?.date && formatDate(event.date)} {event?.timing}
                </p>
                <p className="text-gray-700 font-medium text-sm md:text-xl">
                  {event.location}
                </p>
                <p className="text-sm md:text-xl font-semibold text-blue-700">
                  ₹{event.price}
                </p>

                {/* 👉 Step 2 */}
                <motion.button
                  animate={{}}
                  transition={{}}
                  whileHover={{ scale: 0.8 }}
                  onClick={() => handleBooking(event)}
                  className="mt-4 bg-black text-white px-6 py-2 rounded-full hover:bg-indigo-700 cursor-pointer text-sm md:text-xl"
                >
                  Book Tickets
                </motion.button>
              </div>

              {/* Right side image */}
              <div className="md:w-1/2 flex justify-center ">
                <div className="w-35 h-70 md:w-116 md:h-106 rounded-xl overflow-hidden shadow-md">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="rounded-xl shadow-md w-full h-full object-fill "
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSlider;
