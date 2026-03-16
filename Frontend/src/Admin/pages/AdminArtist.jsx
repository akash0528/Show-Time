import axios from "axios";
import {
  AiOutlinePlus,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineFileText,
} from "react-icons/ai";
import { AiOutlineCalendar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Timer, MapPin, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const AdminArtist = () => {
  const [Artist, setArtist] = useState([]);
  const [filterArtist, setFilteredArtist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArtist = async () => {
    try {
      const res = await axios.get(
        "https://show-time-backend.onrender.com/api/admin/artist",
        {
          withCredentials: true,
        },
      );
      const data = res.data.artist || res.data || [];
      setArtist(data);
      setFilteredArtist(data);
      setLoading(false);
    } catch (err) {
      toast.error("Library sync failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtist();
  }, []);

  useEffect(() => {
    const filtered = Artist.filter((m) => {
      const title = (m.title || "").toLowerCase();
      const location = (m.location || "").toLowerCase();

      return (
        title.includes(searchQuery.toLowerCase()) ||
        location.includes(searchQuery.toLowerCase())
      );
    });

    setFilteredArtist(filtered);
  }, [searchQuery, Artist]);

  const handleDelete = async (id) => {
    if (window.confirm("Are You sure to Delete!")) {
      try {
        await axios.delete(
          `https://show-time-backend.onrender.com/api/admin/artist/${id}`,
          {
            withCredentials: true,
          },
        );
        toast.success("Movie Removed");
        fetchArtist();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  const handleFeatureToggle = async (id, value) => {
    try {
      await axios.patch(
        `https://show-time-backend.onrender.com/api/admin/home/artist/feature/${id}`,
        { isFeatured: value },
        { withCredentials: true },
      );

      toast.success("Home Feature Updated");

      fetchArtist();
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
            <h1 className="text-[11px] uppercase tracking-[0.4em] text-white font-black mb-1">
              SHOW-TIME
            </h1>
            <p className="text-3xl font-black italic tracking-tighter uppercase text-fuchsia-500">
              ARTIST MANAGEMENT
            </p>
          </div>

          <div className="relative w-full md:w-112.5">
            <AiOutlineSearch
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              size={22}
            />
            <input
              type="text"
              placeholder="Search by title, date, location..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-14 pr-6 outline-none focus:border-indigo-500/50 transition-all text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="relative group overflow-hidden bg-white text-black px-4 py-3 rounded-full font-bold transition-all duration-300 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer"
            onClick={() => navigate("/admin/Artist/add")}
          >
            <span className="relative z-10 flex items-center gap-2 text-lg cursor-pointer">
              <AiOutlinePlus /> Create Artist
            </span>
            <div className="absolute inset-0 bg-fuchsia-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </header>

      {/* Main Event */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center py-20 text-fuchsia-500 font-bold uppercase tracking-widest">
              Syncing Archives...
            </div>
          ) : filterArtist.length === 0 ? (
            <div className="text-center py-14 text-fuchsia-500">
              <p className="text-2xl uppercase tracking-[0.3em] font-black">
                No Artist Found 😔
              </p>
              <p className="text-xs mt-3 text-fuchsia-500">
                Try searching with a different keyword
              </p>
            </div>
          ) : (
            filterArtist.map((m) => (
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
                    <h2 className="text-2xl font-black text-fuchsia-500 mb-2">
                      {m.title}
                    </h2>
                    <h3 className="text-2xl font-black text-fuchsia-500 mb-2">
                      {m.artistName}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-base text-fuchsia-500 font-mono font-bold ml-4">
                        ₹{m.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="size-4"
                        checked={m.isFeatured || false}
                        onChange={(e) =>
                          handleFeatureToggle(m._id, e.target.checked)
                        }
                      />
                      <span className="text-orange-400">Show On Home</span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex gap-3">
                    {/* EDIT BUTTON */}
                    <button
                      onClick={() => navigate(`/admin/Artist/edit/${m._id}`)}
                      className="p-4 bg-white/5 rounded-2xl text-zinc-400 hover:text-white hover:bg-fuchsia-500 transition-all cursor-pointer"
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
                    <p className="text-[10px] text-fuchsia-500 uppercase font-black tracking-[0.2em] flex items-center gap-2 ">
                      <AiOutlineFileText
                        className="text-fuchsia-500"
                        size={20}
                      />{" "}
                      Description
                    </p>
                    <p
                      className=" text-sm text-zinc-300 font-medium
    max-h-24
    overflow-y-auto
    pr-2
    wrap-break-word
    whitespace-pre-wrap
    scrollbar-thin
    scrollbar-thumb-orange-400/40
    scrollbar-track-transparent px-4"
                    >
                      {m.description || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-fuchsia-500 uppercase font-black tracking-[0.2em] flex items-center gap-2 ">
                      <Timer className="text-fuchsia-500" size={20} /> Duration
                    </p>
                    <p className="text-sm text-zinc-300 font-medium px-8">
                      {m.performDetail || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-fuchsia-500 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      <AiOutlineCalendar
                        className="text-fuchsia-500"
                        size={20}
                      />{" "}
                      Release Date
                    </p>
                    <p className="text-sm text-zinc-300 font-medium px-2">
                      {m.date
                        ? new Date(m.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "TBA"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-fuchsia-500 uppercase font-black tracking-[0.2em] flex items-center gap-2">
                      <Clock className="text-fuchsia-500" size={20} /> Timing
                    </p>
                    <p className="text-sm text-zinc-300 font-medium px-4">
                      {m.timing || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] text-fuchsia-500 uppercase font-black tracking-[0.2em] flex items-center gap-2 ">
                      <MapPin className="text-fuchsia-500" size={20} /> Location
                    </p>
                    <p className="text-sm text-zinc-300 font-medium my-2 px-6">
                      {m.location || "N/A"}
                    </p>
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

export default AdminArtist;
