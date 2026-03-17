import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ArtistPage = () => {
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchArtists = async () => {
      try {
        const res = await axios.get(
          "https://show-time-backend.onrender.com/api/artist",
        );
        setArtist(res.data);
      } catch (error) {
        toast.error("Movies are not Fetched");
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  if (loading) {
    return <div className="py-10 text-center ">Loading Artists...</div>;
  }

  if (!artist || artist.length === 0) {
    return null;
  }

  return (
    <div className="w-full ">
      <h1 className="text-3xl pt-4 px-10 md:ml-16 font-bold">
        Artist In Your District
      </h1>
      <div className="relative  bg-white py-6 flex justify-center items-center">
        {/* ✅ Left Arrow */}
        <div className="hidden md:block absolute left-5 z-20">
          <button className="custom-prev bg-white shadow-md hover:bg-gray-200 rounded-full p-3 transition cursor-pointer ml-4">
            <FaArrowLeft size={20} className="text-gray-700" />
          </button>
        </div>

        {/* ✅ Right Arrow */}
        <div className="hidden md:block absolute right-5 z-20">
          <button className="custom-next bg-white shadow-md hover:bg-gray-200 rounded-full p-3 transition cursor-pointer mr-2">
            <FaArrowRight size={20} className="text-gray-700" />
          </button>
        </div>

        {/* ✅ Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          slidesPerView={6}
          spaceBetween={8}
          className="w-[90%]"
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 6, spaceBetween: 15 },
          }}
        >
          {artist.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex flex-col items-center gap-3"
                onClick={() => Navigate(`/artist/${item._id}`)}
              >
                <img
                  src={item.image}
                  alt={item.artistName}
                  className="w-40 h-40 gap-4 sm:w-50 sm:h-50 object-cover rounded-full cursor-pointer shadow-md"
                />
                <p className="text-center mt-2 text-sm sm:text-base md:text-lg font-semibold">
                  {item.artistName}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ArtistPage;
