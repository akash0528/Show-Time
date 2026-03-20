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
    <div className="w-full md:px-12 px-8">
      <h1 className="font-bold px-6 md:text-3xl text-2xl pt-4">
        Recent Movies
      </h1>
      <div className="w-full md:px-12 px-8">
        <h1 className="font-bold px-6 md:text-3xl text-2xl pt-4">
          Recent Movies
        </h1>

        {/* Responsive Grid: Mobile pe 2 columns, Tablet pe 3, Laptop pe 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
          {filtered.map((movie, movi) => (
            <motion.div
              // md:w-50 aur md:ml-4 ko hata diya hai kyunki Grid khud width handle karta hai
              className="w-full rounded-lg cursor-pointer border border-gray-300 overflow-hidden"
              key={movie._id || movi}
              whileHover={{ scale: 0.95 }}
              onClick={() => navigate(`/movie/${movie._id}`)}
            >
              <img
                src={movie?.image}
                alt={movie?.title}
                // object-cover image ko stretch nahi hone dega
                className="rounded-t-lg object-cover h-56 sm:h-60 md:h-60 w-full"
              />
              <div className="p-2">
                <p className="font-bold md:text-lg text-sm truncate">
                  {movie?.title}
                </p>
                <p className="text-sm text-gray-800 font-medium">
                  {movie?.rating} | {movie?.genre} | {movie?.language}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewMovie;
