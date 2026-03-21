import { motion } from "motion/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSearch } from "../Context/SearchProvider";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const NewMovie = () => {
  const [recentMovie, setRecentMovie] = useState([]);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const fetchRecentMovie = async () => {
    setloading(true);
    try {
      const res = await axios.get(
        "https://show-time-backend.onrender.com/api/movies/recent-movies",
      );
      setRecentMovie(res.data);
    } catch (error) {
      toast.error("Library sync failed");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchRecentMovie();
  }, []);

  const { query } = useSearch();

  const filtered = recentMovie.filter((m) =>
    m.title?.toLowerCase().includes(query),
  );

  if (query && filtered.length === 0) {
    return (
      <div className="min-h-screen flex my-24 justify-center text-2xl font-semibold text-black">
        No Movie Found 😕
      </div>
    );
  }

  if (loading) {
    return (
      <p className="min-h-screen text-center text-xl">
        <ClipLoader loading={true} />
      </p>
    );
  }

  if (!recentMovie || recentMovie.length === 0) {
    return null;
  }

  return (
    <div className="w-full md:px-12 px-4">
      <h1 className="font-bold px-6 md:text-3xl text-2xl pt-4">
        Recent Movies
      </h1>
      <div className="grid grid-cols-2 gap-6 p-4 md:flex md:gap-4">
        {filtered.map((movie, movi) => (
          <motion.div
            className="w-full rounded-lg cursor-pointer border border-gray-300 overflow-hidden"
            animate={{}}
            key={movi}
            transition={{}}
            whileHover={{ scale: 0.95 }}
            onClick={() => navigate(`/movie/${movie._id}`)}
          >
            <img
              src={movie?.image}
              alt={movie?.title}
              className="w-full aspect-2/3 object-cover rounded-t-lg"
            />
            <p className="font-bold md:text-lg text-sm px-2 pt-2">
              {movie?.title}
            </p>
            <p className="px-2 pb-2 text-sm text-gray-800 font-medium">
              {movie?.rating} | {movie?.genre} | {movie?.language}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewMovie;
