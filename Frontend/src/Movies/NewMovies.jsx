import axios from "axios";
import { useSearch } from "../Context/SearchProvider";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewMovies = () => {
  const [PremierMovie, setPremierMovie] = useState([]);
  const navigate = useNavigate();

  const fetchPremierMovie = async () => {
    try {
      const res = await axios.get(
        "https://show-time-backend.onrender.com/api/movies/premier-movies",
      );
      setPremierMovie(res.data);
    } catch (error) {
      toast.error("Library sync failed");
    }
  };

  useEffect(() => {
    fetchPremierMovie();
  }, []);

  const { query } = useSearch();

  const filtered = PremierMovie.filter((m) =>
    m.title?.toLowerCase().includes(query),
  );

  if (query && filtered.length === 0) {
    return (
      <div className=" flex my-24 justify-center text-2xl font-semibold text-black"></div>
    );
  }

  return (
    <div className="w-full px-12">
      <h1 className="font-bold px-6 md:text-3xl text-2xl pt-4">
        Premiering This Week
      </h1>

      {/* Responsive wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 p-4 md:flex md:gap-2">
        {filtered.map((movies, el) => (
          <div
            className="w-full md:w-50 rounded-lg cursor-pointer border border-gray-300 ml-0 md:ml-4"
            key={el}
            onClick={() => navigate(`/movie/${movies._id}`)}
          >
            <img
              src={movies?.image}
              alt={movies?.title}
              className="rounded-tr-lg rounded-tl-lg object-fill h-56 sm:h-60 md:h-60 w-full"
            />
            <p className="font-bold md:font-medium text-base md:text-lg px-2 pt-2 truncate">
              {movies?.title}
            </p>
            <p className="px-2 pb-2 text-sm text-gray-800 font-medium truncate">
              {movies.rating} | {movies?.genre} | {movies?.language}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewMovies;
