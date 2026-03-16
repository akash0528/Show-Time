import { useEffect, useState } from "react";
import axios from "axios";
import {
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import {
  MdOutlineMovieFilter,
  MdOutlinePersonOutline,
  MdOutlineStyle,
  MdLocationOn,
} from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        "https://show-time-backend.onrender.com/api/admin/movies",
        {
          withCredentials: true,
        },
      );
      const data = res.data.movies || res.data || [];
      setMovies(data);
      setFilteredMovies(data);
      setLoading(false);
    } catch (err) {
      toast.error("Library sync failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = movies.filter((m) => {
      const title = (m.title || "").toLowerCase();
      const director = (m.director || "").toLowerCase();

      const genre = Array.isArray(m.genre)
        ? m.genre.join(" ").toLowerCase()
        : (m.genre || "").toLowerCase();

      return (
        title.includes(searchQuery.toLowerCase()) ||
        director.includes(searchQuery.toLowerCase()) ||
        genre.includes(searchQuery.toLowerCase())
      );
    });

    setFilteredMovies(filtered);
  }, [searchQuery, movies]);

  const handleDelete = async (id) => {
    if (window.confirm("Are You sure to Delete!")) {
      try {
        await axios.delete(
          `https://show-time-backend.onrender.com/api/admin/movies/${id}`,
          {
            withCredentials: true,
          },
        );
        toast.success("Movie Removed");
        fetchMovies();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleFeatureToggle = async (id, value) => {
    try {
      await axios.patch(
        `https://show-time-backend.onrender.com/api/admin/home/movies/feature/${id}`,
        { isFeatured: value },
        { withCredentials: true },
      );

      toast.success("Home Feature Updated");

      fetchMovies();
    } catch (err) {
      toast.error("Feature update failed");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#050505] text-[#e4e4e7] overflow-hidden font-sans">
      {/* HEADER SECTION */}
      <header className="shrink-0 p-5 border-b border-white/5 bg-[#080808]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-[11px] uppercase tracking-[0.4em] text-indigo-500 font-black mb-1">
              MOVIES MANAGEMENT
            </h1>
            <p className="text-3xl font-black italic tracking-tighter uppercase">
              SHOW-TIME
            </p>
          </div>

          <div className="relative w-full md:w-112.5">
            <AiOutlineSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              size={22}
            />
            <input
              type="text"
              placeholder="Search by title, director, cast..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-14 pr-6 outline-none focus:border-indigo-500/50 transition-all text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="relative group overflow-hidden bg-white text-black px-8 py-3 rounded-full font-bold transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer"
            onClick={() => navigate("/admin/movies/add")}
          >
            <span className="relative z-10 flex items-center gap-2 text-lg cursor-pointer">
              <AiOutlinePlus /> Add Movies
            </span>
            <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </header>

      {/* MAIN LIST */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center py-20 text-zinc-600 font-bold uppercase tracking-widest">
              Syncing Archives...
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-14 text-blue-500">
              <p className="text-2xl uppercase tracking-[0.3em] font-black">
                No Movies Found 😔
              </p>
              <p className="text-xs mt-3 text-zinc-600">
                Try searching with a different keyword
              </p>
            </div>
          ) : (
            filteredMovies.map((m) => (
              <div
                key={m._id}
                className="relative bg-[#0c0c0c] border border-white/5 hover:border-white/20 p-4 rounded-2xl transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                  <div className="w-16 h-24 rounded-2xl overflow-hidden shrink-0 shadow-2xl border border-white/10">
                    <img
                      src={m.image}
                      className="w-full h-full object-cover"
                      alt={m.title}
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-white mb-2">
                      {m.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase rounded-lg border border-indigo-500/20">
                        {m.rating}
                      </span>
                      <span className="text-base text-zinc-500 font-bold uppercase tracking-widest">
                        {m.language}
                      </span>
                      <span className="text-base text-indigo-500 font-mono font-bold ml-4">
                        ₹{m.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 my-2">
                      <input
                        type="checkbox"
                        className="size-4"
                        checked={m.isFeatured || false}
                        onChange={(e) =>
                          handleFeatureToggle(m._id, e.target.checked)
                        }
                      />
                      <span className="text-indigo-500">Show On Home</span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3">
                    {/* EDIT BUTTON: Ab ye naye page par le jayega */}
                    <button
                      onClick={() => navigate(`/admin/movies/edit/${m._id}`)}
                      className="p-4 bg-white/5 rounded-2xl text-zinc-400 hover:text-white hover:bg-indigo-600 transition-all cursor-pointer"
                    >
                      <AiOutlineEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="p-4 bg-white/5 rounded-2xl text-zinc-400 hover:text-white hover:bg-red-600 transition-all cursor-pointer"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </div>

                {/* DETAILS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pt-4 border-t border-white/5">
                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      <MdOutlineStyle className="text-indigo-500" size={20} />{" "}
                      Genre
                    </p>
                    <p className="text-sm text-zinc-300 font-medium">
                      {m.genre || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      <MdOutlinePersonOutline
                        className="text-indigo-500"
                        size={20}
                      />{" "}
                      Cast
                    </p>
                    <p className="text-sm text-zinc-300 font-medium truncate">
                      {Array.isArray(m.cast)
                        ? m.cast.join(", ")
                        : m.cast || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      <MdOutlineMovieFilter
                        className="text-indigo-500"
                        size={20}
                      />{" "}
                      Director
                    </p>
                    <p className="text-sm text-zinc-300 font-medium">
                      {m.director || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      <AiOutlinePlayCircle
                        className="text-indigo-500"
                        size={20}
                      />{" "}
                      Status
                    </p>
                    <p className="text-sm text-zinc-300 font-medium">
                      {m.status || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      <AiOutlineCalendar
                        className="text-indigo-500"
                        size={20}
                      />{" "}
                      Release Date
                    </p>
                    <p className="text-sm text-zinc-300 font-medium">
                      {m.releaseDate
                        ? new Date(m.releaseDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "TBA"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      <AiOutlinePlayCircle
                        className="text-indigo-500"
                        size={20}
                      />{" "}
                      Location
                    </p>
                    {m.theatres?.map((theatre) => (
                      <div key={theatre._id} className="flex gap-4 items-start">
                        <div>
                          <h3 className="font-bold">
                            {theatre.name}, {theatre.location}
                          </h3>

                          <div className="flex gap-2 mt-2 flex-wrap">
                            {theatre.times?.map((time, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs bg-indigo-500/10 border border-indigo-500/20 rounded-md"
                              >
                                {time}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminMovies;
