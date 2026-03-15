import React, { useState, useRef } from "react";
import axios from "../../../Api/axiosConfig";
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdOutlineMovieFilter } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddMovies = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  /* ---------------- STATE ---------------- */

  const [preview, setPreview] = useState(null);
  const [posterFile, setPosterFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    releaseDate: "",
    price: "",
    rating: "UA",
    language: "",
    genre: "",
    status: "Coming Soon",
    director: "",
    cast: "",
  });

  const [theatres, setTheatres] = useState([
    {
      name: "",
      location: "",
      times: [""],
      image: null,
    },
  ]);

  /* ---------------- THEATRE FUNCTIONS ---------------- */

  const addTheatre = () => {
    setTheatres([
      ...theatres,
      {
        name: "",
        location: "",
        times: [""],
        image: null,
      },
    ]);
  };

  const addTime = (index) => {
    const updated = [...theatres];
    updated[index].times.push("");
    setTheatres(updated);
  };

  /* ---------------- IMAGE HANDLER ---------------- */

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too heavy!");
      return;
    }

    setPosterFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ---------------- FORM SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!posterFile) {
      return toast.error("Poster image required!");
    }

    const loadingToast = toast.loading("Adding movie...");

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      data.append("theatres", JSON.stringify(theatres));
      data.append("image", posterFile);

      await axios.post("/api/admin/movie", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.update(loadingToast, {
        render: "Movie Added Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate("/admin/movies");
    } catch (err) {
      toast.update(loadingToast, {
        render: err.response?.data?.message || "Failed to add movie",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  /* ---------------- JSX UI ---------------- */

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 p-2 md:p-6 flex items-center justify-center font-sans">
      <div className="w-full max-w-5xl bg-[#121212] border border-white/5 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[95vh]">
        {/* POSTER SECTION */}

        <div className="w-full md:w-1/3 bg-[#181818] p-6 flex flex-col items-center border-r border-white/5">
          <div className="w-full mb-4 flex items-center gap-2">
            <MdOutlineMovieFilter className="text-indigo-500" size={20} />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">
              Movie Poster
            </h3>
          </div>

          <div
            onClick={() => fileInputRef.current.click()}
            className={`group relative w-full aspect-2/3 rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden flex items-center justify-center ${
              preview
                ? "border-indigo-500"
                : "border-zinc-800 hover:border-indigo-500 hover:bg-indigo-500/5"
            }`}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <AiOutlineCloudUpload
                  size={32}
                  className="text-zinc-600 mx-auto mb-2 group-hover:text-indigo-500"
                />
                <p className="text-[10px] font-bold text-zinc-500 uppercase">
                  Click to Upload
                </p>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />

          {preview && (
            <button
              onClick={() => {
                setPreview(null);
                setPosterFile(null);
              }}
              className="mt-3 text-[10px] text-red-500 font-bold hover:underline flex items-center gap-1"
            >
              <AiOutlineDelete />
              REMOVE
            </button>
          )}
        </div>

        {/* FORM SECTION */}

        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black uppercase italic text-white">
              Add New Cinema
            </h2>

            <AiOutlineClose
              className="cursor-pointer hover:text-white"
              onClick={() => navigate("/admin/movies")}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* MOVIE INPUTS */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Title",
                  field: "title",
                  type: "text",
                  ph: "Avatar 2",
                },
                {
                  label: "Price (₹)",
                  field: "price",
                  type: "number",
                  ph: "199",
                },
                { label: "Release Date", field: "releaseDate", type: "date" },
                {
                  label: "Language",
                  field: "language",
                  type: "text",
                  ph: "English",
                },
                {
                  label: "Genre",
                  field: "genre",
                  type: "text",
                  ph: "Action, Sci-Fi",
                },
                {
                  label: "Director",
                  field: "director",
                  type: "text",
                  ph: "James Cameron",
                },
              ].map((item) => (
                <div key={item.field} className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase">
                    {item.label}
                  </label>

                  <input
                    required
                    type={item.type}
                    placeholder={item.ph}
                    className="bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-indigo-500 outline-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [item.field]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase">
                Status
              </label>
              <select
                className="bg-[#1a1a1a] border border-white/10 rounded-lg p-2 text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="Coming Soon">Coming Soon</option>
                <option value="Now Showing">Now Showing</option>
              </select>
            </div>

            {/* CAST */}

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase">
                Cast (Comma Separated)
              </label>

              <input
                placeholder="Sam Worthington, Zoe Saldana"
                className="bg-white/5 border border-white/10 rounded-lg p-2 text-sm"
                onChange={(e) =>
                  setFormData({ ...formData, cast: e.target.value })
                }
              />
            </div>

            {/* THEATRES */}

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase">
                Theatres & Showtimes
              </label>

              {theatres.map((theatre, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-lg p-3 space-y-2"
                >
                  <input
                    placeholder="Theatre Name"
                    className="input"
                    onChange={(e) => {
                      const updated = [...theatres];
                      updated[index].name = e.target.value;
                      setTheatres(updated);
                    }}
                  />

                  <input
                    placeholder="Location"
                    className="input"
                    onChange={(e) => {
                      const updated = [...theatres];
                      updated[index].location = e.target.value;
                      setTheatres(updated);
                    }}
                  />

                  {theatre.times.map((time, i) => (
                    <input
                      key={i}
                      placeholder="Showtime (01:30PM)"
                      className="input"
                      onChange={(e) => {
                        const updated = [...theatres];
                        updated[index].times[i] = e.target.value;
                        setTheatres(updated);
                      }}
                    />
                  ))}

                  <button
                    type="button"
                    onClick={() => addTime(index)}
                    className="text-indigo-500 text-xs font-bold"
                  >
                    + Add Time
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addTheatre}
                className="text-green-500 text-xs font-bold"
              >
                + Add Theatre
              </button>
            </div>

            {/* BUTTONS */}

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all"
              >
                SAVE PRODUCTION
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/movies")}
                className="px-6 py-3 border border-white/10 rounded-2xl font-bold hover:bg-red-500/10 hover:text-red-500"
              >
                CANCEL
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovies;
