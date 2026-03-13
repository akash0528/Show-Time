import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  AiOutlineArrowLeft,
  AiOutlineSave,
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const EditArtist = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(null); // ✅ null (NOT "")

  const [formData, setFormData] = useState({
    artistName: "",
    title: "",
    location: "",
    timing: "",
    duration: "",
    date: "",
    price: "",
    description: "",
    image: null,
  });

  // ✅ FETCH ARTIST
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/artist/${id}`,{
            withCredentials:true
          }
        );

        const artist =
  res.data.artist ||
  res.data.data ||
  res.data;

setFormData({
  artistName: artist.artistName ?? "",
  title: artist.title ?? "",
  location: artist.location ?? "",
  timing: artist.timing ?? "",
  duration: artist.duration ?? "",
  price: artist.price ?? "",
  description: artist.description ?? "",
  date: artist.date
    ? new Date(artist.date).toISOString().split("T")[0]
    : "",
  image: null
});

setPreview(artist.image || "");
        setLoading(false);
      } catch (err) {
        toast.error("Artist fetch failed");
        navigate("/admin/artist");
      }
    };

    fetchArtist();
  }, [id, navigate]);

  // ✅ INPUT HANDLER
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ SAVE / UPDATE
  const handleSave = async () => {
    try {
      setSaving(true);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image") {
          if (value instanceof File) data.append("image", value);
        } else {
          data.append(key, value);
        }
      });

      const res = await axios.put(
        `http://localhost:5000/api/admin/artist/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data"},
      withCredentials:true }
      );

      toast.success(res.data.message || "Artist Updated");
      navigate("/admin/artist");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center text-white mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs"
          >
            <AiOutlineArrowLeft /> Back
          </button>

          <h1 className="text-2xl font-bold text-white">
            Edit <span className="text-indigo-500">Artist</span>
          </h1>

          <span className="text-[10px] text-zinc-600">ID_{id?.slice(-6)}</span>
        </header>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* IMAGE */}
          <div className="lg:col-span-3">
            <div className="aspect-2/3 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Artist"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                  No Image
                </div>
              )}

              <label className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition">
                <AiOutlineCloudUpload size={24} />
                <span className="text-xs mt-1">Change</span>
                <input
                  type="file"
                  name="image"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-9 bg-zinc-900/40 p-8 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                name="artistName"
                value={formData.artistName}
                onChange={handleChange}
                placeholder="Artist Name"
                className="input"
              />

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="input"
              />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="input"
              />

              <input
                name="timing"
                value={formData.timing}
                onChange={handleChange}
                placeholder="Timing"
                className="input"
              />

              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="input"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input"
              />

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="input"
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Description"
                className="input md:col-span-2 resize-none"
              />

              <button
                onClick={handleSave}
                disabled={saving}
                className="md:col-span-2 bg-indigo-600 hover:bg-white hover:text-black py-4 rounded-xl font-bold text-sm flex justify-center gap-2"
              >
                {saving ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <AiOutlineSave />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SIMPLE CSS */}
      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 14px;
          color: white;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
        }
      `}</style>
    </div>
  );
};

export default EditArtist;
