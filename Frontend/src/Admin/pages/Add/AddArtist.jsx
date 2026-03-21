import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";

const AddArtist = () => {
  const navigate = useNavigate();

  // text fields
  const [formData, setFormData] = useState({
    artistName: "",
    title: "",
    description: "",
    location: "",
    date: "",
    price: "",
    performDetail: "",
    timing: "",
  });

  // image file
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // TEXT INPUT HANDLER
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FILE HANDLER
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file)); // ✅ PREVIEW
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // SUBMIT
  const submit = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.error("Poster image required");
    }

    const loadingToast = toast.loading("Creating event...");

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      data.append("image", image);

      await axios.post(
        "https://show-time-backend.onrender.com/api/admin/artist",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      toast.update(loadingToast, {
        render: "Event Created Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate("/admin/artist");
    } catch (err) {
      toast.update(loadingToast, {
        render: err.response?.data?.message || "Failed to create event",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-2xl bg-[#0f111a] border border-white/10 rounded-3xl p-10 shadow-2xl space-y-7"
      >
        <h2 className="text-3xl font-bold text-white text-center">
          🎉 Create Artist
        </h2>

        {/* INPUTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "artistName",
            "title",
            "location",
            "date",
            "price",
            "performDetail",
            "timing",
          ].map((field) => (
            <input
              key={field}
              type={
                field === "date"
                  ? "date"
                  : field === "price"
                    ? "number"
                    : "text"
              }
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              placeholder={field}
              className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          ))}
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
          placeholder="Description"
          className="w-full bg-transparent border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        {/* IMAGE UPLOAD */}
        <label className="flex items-center gap-4 border border-dashed border-white/20 rounded-xl p-4 cursor-pointer hover:border-indigo-500 transition">
          <AiOutlineCloudUpload className="text-white text-2xl" />
          <span className="text-gray-400">
            {image ? image.name : "Upload Event Image"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* IMAGE PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl border border-white/20"
          />
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-linear-to-r from-orange-500 to-purple-500 text-white py-3 rounded-2xl font-semibold text-lg hover:from-purple-500 hover:to-indigo-500 transition"
        >
          Publish Event
        </button>
      </form>
    </div>
  );
};

export default AddArtist;
