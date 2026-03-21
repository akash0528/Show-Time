import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { ClipLoader } from "react-spinners";

const rows = ["A", "B", "C", "D"];
const cols = 8;

const SeatBooking = () => {
  const { state } = useLocation();
  const [movieDetail, setMovieDetail] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://show-time-backend.onrender.com/api/movies/${id}`,
      );
      setMovieDetail(res.data);
    } catch (error) {
      toast.error("Library sync failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="min-h-screen text-center text-xl">
        <ClipLoader loading={true} />
      </p>
    );
  }

  useEffect(() => {
    fetchMovies();
  }, [id]);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId],
    );
  };

  const handlebookingTicket = async (e) => {
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
          itemType: "AdminMovies",
          seats: selectedSeats,
          theatre: state?.theatre,
          date: state?.date,
          time: state?.time,
          totalAmount: selectedSeats?.length * movieDetail?.price,
        },
        { withCredentials: true },
      );
      navigate("/booking");
      toast.success("Ticked Booked Successfully");
    } catch (error) {
      toast.error("Ticket Not Booked");
    }
  };

  if (!movieDetail) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* SHOW DETAILS */}
      <div className="bg-white p-4 rounded mb-6 shadow flex items-center gap-4">
        <img
          className="h-24 w-20 rounded-lg object-cover"
          src={movieDetail?.image}
          alt={movieDetail?.title}
        />

        <div>
          <h2 className="text-xl font-bold">{movieDetail?.title}</h2>

          <p className="text-gray-600">{state?.theatre}</p>

          <p className="text-sm text-gray-500">
            {state?.date} | {state?.time}
          </p>
        </div>
      </div>

      {/* SCREEN */}
      <div className="text-center mb-6">
        <div className="mx-auto w-3/4 h-2 bg-gray-400 rounded mb-2"></div>
        <p className="text-sm">SCREEN THIS WAY</p>
      </div>

      {/* SEATS */}
      <div className="flex flex-col items-center gap-3">
        {rows.map((row) => (
          <div key={row} className="flex gap-2 items-center">
            <span className="w-6 font-bold">{row}</span>

            {Array.from({ length: cols }).map((_, i) => {
              const seatId = `${row}${i + 1}`;
              const selected = selectedSeats.includes(seatId);

              return (
                <button
                  key={seatId}
                  onClick={() => toggleSeat(seatId)}
                  className={`w-8 h-8 rounded text-xs font-bold
                    ${
                      selected
                        ? "bg-green-600 text-white"
                        : "bg-white border border-gray-400"
                    }
                  `}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="bg-white p-4 mt-6 rounded shadow max-w-md mx-auto">
        <p>
          <b>Selected Seats:</b>{" "}
          {selectedSeats.length === 0 ? "None" : selectedSeats.join(", ")}
        </p>

        <p className="mt-2 font-bold">
          Total: ₹{selectedSeats.length * movieDetail?.price}
        </p>

        <button
          disabled={selectedSeats.length === 0}
          className={`w-full mt-4 py-2 rounded text-white
            ${selectedSeats.length === 0 ? "bg-gray-400" : "bg-black"}`}
          onClick={handlebookingTicket}
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
};

export default SeatBooking;
