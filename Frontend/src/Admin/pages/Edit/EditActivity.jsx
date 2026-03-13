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

const EditActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    ageLimits: "",
    timing: "",
    price: "",
    duration: "",
    date: "",
    customDateText: "",
    image: null,
    description: "",
  });

  // ✅ FETCH ACTIVITY
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/activity/${id}`,{
            withCredentials:true
          } 
        );

        const activity = res.data.activity || res.data;

        // ✅ FORMAT DATE FOR INPUT TYPE="date"
        const formattedDate = activity.date
          ? new Date(activity.date).toISOString().split("T")[0]
          : "";

        setFormData({
          title: activity.title || "",
          location: activity.location || "",
          ageLimits: activity.ageLimits || "",
          timing: activity.timing || "",
          price: activity.price || "",
          duration: activity.duration || "",
          description: activity.description || "",
          customDateText: activity.customDateText || "",
          date: formattedDate,
          image: null, // important
        });

        setPreview(activity.image);
        setLoading(false);
      } catch (err) {
        toast.error("Fetch Failed!");
        navigate("/admin/activity");
      }
    };

    fetchActivity();
  }, [id, navigate]);

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ SAVE
  const handleSave = async () => {
    try {
      setSaving(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "image") {
          if (formData.image) {
            data.append("image", formData.image);
          }
        } else {
          data.append(key, formData[key]);
        }
      });

      const res = await axios.put(
        `http://localhost:5000/api/admin/activity/${id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" },
      withCredentials:true }
      );

      toast.success(res.data.message || "Updated Successfully");
      navigate("/admin/activity");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest"
          >
            <AiOutlineArrowLeft /> Back
          </button>

          <h1 className="text-2xl font-black italic uppercase text-white">
            Edit <span className="text-indigo-500">Activity</span>
          </h1>

          <span className="text-[10px] font-mono text-zinc-600">
            ID_{id?.slice(-6)}
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* IMAGE */}
          <div className="lg:col-span-3">
            <div className="relative w-full max-w-60 mx-auto rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 group">
              <img
                src={preview}
                alt="Poster"
                className="w-full h-full object-cover"
              />

              <label className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition">
                <AiOutlineCloudUpload size={24} />
                <span className="text-xs mt-1">Change</span>
                <input
                  type="file"
                  className="hidden"
                  name="image"
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>

          {/* FORM */}
          <div className="lg:col-span-9 bg-zinc-900/30 p-8 rounded-3xl border border-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="input" />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="input" />
              <input name="ageLimits" value={formData.ageLimits} onChange={handleChange} placeholder="Age Limits" className="input" />
              <input name="timing" value={formData.timing} onChange={handleChange} placeholder="Timing" className="input" />
              <input name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" className="input" />

              {/* DATE */}
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Date"
                className="input"
              />

              {/* CUSTOM DATE */}
              <input
                name="customDateText"
                value={formData.customDateText}
                onChange={handleChange}
                placeholder="Custom Date Text (optional)"
                className="input"
              />

              <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="input" />

              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="md:col-span-2 input resize-none"
              />

              <button
                onClick={handleSave}
                disabled={saving}
                className="md:col-span-2 bg-indigo-600 hover:bg-white hover:text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition"
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

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 14px;
          outline: none;
          transition: 0.2s;
          font-size: 14px;
        }
        .input:focus {
          border-color: #6366f1;
        }
      `}</style>
    </div>
  );
};

export default EditActivity;