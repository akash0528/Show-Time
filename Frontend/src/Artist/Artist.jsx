import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
import { ClipLoader } from "react-spinners";

const Artist = () => {
  const [count, setCount] = useState(0);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const fetchArtist = async () => {
      try {
        const res = await axios.get(
          `https://show-time-backend.onrender.com/api/artist/${id}`,
        );
        setArtist(res.data);
      } catch (error) {
        toast.error("Artist are Not Fetch");
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
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
        "https://show-time-backend.onrender.com/auth/bookings",
        {
          item: id,
          itemType: "Artist",
          ticket: count,
          totalAmount: count * artist.price,
        },
        { withCredentials: true },
      );
      setCount(0);
      toast.success(` Ticket Book Successfully`);
      navigate("/Booking");
    } catch (error) {}
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
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
    <>
      <div className="w-full  bg-linear-to-br from-black via-gray-900 to-black pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:gap-20  ">
          <div className="flex justify-center md:justify-start">
            <img
              src={artist?.image}
              alt={artist?.artistName}
              className="w-70 h-70 md:w-130 md:h-130 md:ml-25 rounded-xl"
            />
          </div>
          <div className="md:-ml-30 w-full md:w-172 text-white mt-6 md:mt-0">
            <h1 className="md:text-3xl text-2xl font-bold">
              {artist?.artistName}
            </h1>
            <p className="md:text-[17px] text-[15px] font-medium mt-2 ">
              {artist?.description}
            </p>
          </div>
        </div>
        <div className="flex justify-center md:justify-start ">
          <div className="w-[90%] md:w-100 border border-gray-200 rounded-lg p-4 text-white mt-6 md:ml-30">
            <h1 className="font-bold ">{artist?.title}</h1>
            <p className="text-md  font-medium p-1">{artist?.performDetail}</p>
            <p className="text-md  font-medium p-1">
              {artist?.date && formatDate(artist.date)},{artist?.timing}
            </p>
            <p className="text-md  font-medium p-1">{artist?.location}</p>
            <hr className="my-2" />
            <div className="flex justify-between gap-4 p-2">
              <div className=" ">
                <p className="font-bold ">Starts from</p>
                <h1 className="font-bold">₹{artist?.price}</h1>
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
                    <div className="flex w-20 rounded-lg overflow-hidden">
                      <button
                        className="w-8 h-10 text-xl  text-white bg-black cursor-pointer"
                        onClick={handleDecrase}
                      >
                        {" "}
                        −{" "}
                      </button>

                      <span className="text-xl font-bold w-8 text-center pt-1 text-white bg-black cursor-pointer">
                        {count}
                      </span>

                      <button
                        className="w-8 h-10 bg-black text-white text-xl cursor-pointer"
                        onClick={handleIncrease}
                      >
                        +{" "}
                      </button>
                    </div>

                    <button
                      className="bg-black text-white px-6 py-2 rounded-lg ml-2 cursor-pointer"
                      onClick={handleBookTicket}
                    >
                      Proceed ₹{count * artist?.price}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Artist;
