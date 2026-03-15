import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../Api/axiosConfig";
import { toast } from "react-toastify";
import {
  AiOutlineArrowLeft,
  AiOutlineSave,
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    director: "",
    genre: "",
    cast: "",
    price: "",
    rating: "",
    releaseDate: "",
    image: null,
    status: "",
    language: "",
    isFeatured: "",
    theatres: [],
  });

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/admin/movies/${id}`, {
          withCredentials: true,
        });
        const movie = res.data.movie || res.data;
        const formattedDate = movie.releaseDate
          ? new Date(movie.releaseDate).toISOString().split("T")[0]
          : "";
        setFormData({
          ...movie,
          cast: Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast,
          releaseDate: formattedDate,
          theatres: movie.theatres || [],
        });
        setPreview(movie.image);
        setLoading(false);
      } catch (err) {
        toast.error("Fetch Failed!");
        navigate("/admin/movies");
      }
    };
    fetchMovie();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.name === "image" && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Save / Update movie
  const handleSave = async () => {
    try {
      setSaving(true);
      const data = new FormData();

      // Append all fields
      Object.keys(formData).forEach((key) => {
        if (key === "cast") {
          // Convert cast string to array
          formData.cast
            .split(",")
            .forEach((c) => data.append("cast", c.trim()));
        } else if (key === "image" && formData.image instanceof File) {
          data.append("image", formData.image);
        } else if (key === "theatres") {
          data.append("theatres", JSON.stringify(formData.theatres));
        } else {
          data.append(key, formData[key]);
        }
      });

      const res = await axios.put(`/api/admin/movies/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      toast.success(res.data.message);
      navigate("/admin/movies");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest"
          >
            <AiOutlineArrowLeft /> Back
          </button>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter text-white">
            Edit <span className="text-indigo-500">Movie</span>
          </h1>
          <span className="text-[9px] font-mono text-zinc-700 tracking-[0.3em]">
            ID_{id?.slice(-6)}
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Poster */}
          <div className="lg:col-span-3">
            <div className="relative `aspect-2/3` w-full max-w-60 mx-auto rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group shadow-xl">
              <img
                src={preview}
                alt="Poster"
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all">
                <AiOutlineCloudUpload
                  size={24}
                  className="text-indigo-500 mb-1"
                />
                <span className="text-[9px] font-bold uppercase">Change</span>
                <input
                  type="file"
                  className="hidden"
                  name="image"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-9 bg-zinc-900/30 p-8 rounded-3xl border border-white/5 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  Movie Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-2 text-2xl font-bold text-white outline-none focus:border-indigo-500"
                />
              </div>

              {/* Director & Language */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  Director
                </label>
                <input
                  name="director"
                  value={formData.director}
                  onChange={handleChange}
                  className="input-tight"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  Language
                </label>
                <input
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="input-tight"
                />
              </div>

              {/* Genre & Status */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  Genre
                </label>
                <input
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="input-tight"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="input-tight bg-[#0a0a0a]"
                >
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Now Showing">Now Showing</option>
                  <option value="Ended">Ended</option>
                </select>
              </div>

              {/* Release Date & Price */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  Release Date
                </label>
                <input
                  name="releaseDate"
                  type="date"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  className="input-tight"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  Price (₹)
                </label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-tight"
                />
              </div>

              {/* Rating & Cast */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  Rating
                </label>
                <input
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="input-tight"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1 ml-1">
                  Cast Members
                </label>
                <input
                  name="cast"
                  value={formData.cast}
                  onChange={handleChange}
                  className="input-tight"
                />
              </div>

              {/* Theatre & Time */}
              <div className="md:col-span-2">
                <label className="text-xs text-zinc-400">Theatres</label>

                {formData.theatres?.map((theatre, index) => (
                  <div
                    key={index}
                    className="border border-white/10 p-3 rounded-lg mb-3"
                  >
                    {/* Theatre Name */}
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm mb-2"
                      value={theatre.name}
                      onChange={(e) => {
                        const updated = [...formData.theatres];
                        updated[index].name = e.target.value;
                        setFormData({ ...formData, theatres: updated });
                      }}
                      placeholder="Theatre Name"
                    />

                    {/* Location */}
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm mb-2"
                      value={theatre.location}
                      onChange={(e) => {
                        const updated = [...formData.theatres];
                        updated[index].location = e.target.value;
                        setFormData({ ...formData, theatres: updated });
                      }}
                      placeholder="Location"
                    />

                    {/* Showtimes */}
                    <div className="flex flex-col gap-2 mt-2">
                      {theatre.times?.map((time, i) => (
                        <input
                          key={i}
                          className="bg-white/5 border border-white/10 rounded-lg p-2 text-sm"
                          value={time}
                          onChange={(e) => {
                            const updated = [...formData.theatres];
                            updated[index].times[i] = e.target.value;
                            setFormData({ ...formData, theatres: updated });
                          }}
                          placeholder="Showtime (e.g. 01:30PM)"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className="md:col-span-2 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-indigo-600 hover:bg-white hover:text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <AiOutlineSave size={18} />
                  )}
                  Save Modifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
         .input-tight {
          @apply w-full bg-white/3 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-indigo-500/50 transition-all text-sm font-medium;
          }
        `}</style>
    </div>
  );
};

export default EditMovie;
