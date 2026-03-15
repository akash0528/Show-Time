import { useEffect, useState } from "react";
import inox from "../assets/inox.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Api/axiosConfig";
import { toast } from "react-toastify";

const MovieDetails = () => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`/api/movies/${id}`);
      setMovieDetail(res.data);
    } catch (error) {
      toast.error("Library sync failed");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [id]);

  const getDates = () => {
    if (!movieDetail?.releaseDate) return [];

    const startDate = new Date(movieDetail.releaseDate);
    const dates = [];

    for (let i = 0; i < 4; i++) {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + i);
      dates.push(newDate);
    }

    return dates;
  };

  const handleTimeClick = (theatre, time) => {
    if (!selectedDate) {
      toast.error("Please Select Date First");
      return;
    }

    navigate(`/seat-booking/${movieDetail._id}`, {
      state: {
        theatre: theatre.name,
        date: selectedDate.toDateString(),
        time,
      },
    });
  };

  return (
    <>
      {/* Main Container */}

      <div className="w-full py-4">
        {/* Movie Info */}

        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 px-4 mt-4">
          <img
            src={movieDetail?.image}
            alt={movieDetail?.title}
            className="w-28 rounded-lg object-fill"
          />

          <div className="pt-4 sm:pt-6">
            <h4 className="font-bold text-4xl">{movieDetail?.title}</h4>

            <p className="text-lg">
              {movieDetail?.rating} | {movieDetail?.genre?.join(", ")} |{" "}
              {movieDetail?.language}
            </p>
          </div>
        </div>

        <hr className="max-w-5xl mx-auto border-blue-400 my-4" />

        {/* Age */}

        <div className="max-w-5xl mx-auto flex gap-4 px-4">
          <div className="flex items-center justify-center size-12 bg-black text-white rounded-lg">
            <p className="text-xl">{movieDetail?.rating}</p>
          </div>

          <p className="text-sm pt-1">
            Movie Suitable for Adults (18+ Years ) Only
            <br />
            Please Carry Your IDs With Birth date for Verification
          </p>
        </div>

        {/* Date Selection */}

        <div className="max-w-5xl mx-auto flex flex-wrap gap-3 px-4 mt-5">
          {getDates().map((date, index) => {
            const active = selectedDate?.toDateString() === date.toDateString();

            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`size-14 rounded-lg font-bold text-sm
                ${active ? "bg-red-500 text-white" : "bg-black text-white"}
                `}
              >
                {date.getDate()}
                <br />
                {date.toLocaleString("default", { month: "short" })}
              </button>
            );
          })}
        </div>

        <hr className="max-w-5xl mx-auto border-blue-400 my-5" />

        <div className="max-w-5xl mx-auto bg-fuchsia-400 py-2 rounded px-4">
          <p className="text-black font-bold tracking-widest text-sm">
            ⚫ Available | 🟡 Filling Fast | 🔴 Almost Full
          </p>
        </div>

        {/* Theatre List */}

        {movieDetail?.theatres?.map((theatre, index) => (
          <div key={index}>
            <div className="max-w-5xl mx-auto mt-6 flex gap-4 px-4">
              <img
                src={theatre.image || inox}
                alt={theatre.name}
                className="w-16 object-fill rounded-lg"
              />

              <div className="pt-1">
                <h3 className="font-bold">
                  {theatre.name} , {theatre.location}
                </h3>

                <p>Non Cancellable</p>
              </div>
            </div>

            {/* Showtimes */}

            <div className="max-w-5xl mx-auto mt-4 flex flex-wrap gap-4 px-4">
              {theatre.times?.map((time, i) => (
                <button
                  key={i}
                  className="w-32 h-12 border border-gray-400 rounded-lg font-bold cursor-pointer"
                  onClick={() => handleTimeClick(theatre, time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieDetails;
