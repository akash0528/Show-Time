import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // text fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    price: "",
    eventDetail:"",
    eventType:"",
    language:"",
    timing:"",
    duration:"",

  });

  // image
  const [oldImage, setOldImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  /* ================= LOAD EVENT ================= */
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/admin/events/${id}`,{
            withCredentials:true
          }
        );

        const event = res.data.event;

        setFormData({
          title: event.title,
          description: event.description,
          location: event.location,
          date: event.date?.slice(0, 10),
          price: event.price,
        });

        setOldImage(event.image); // cloudinary url
      } catch (err) {
        toast.error("Failed to load event");
      }
    };

    loadEvent();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ================= SUBMIT ================= */
  const submit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Updating event...");

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.put(
        `http://localhost:5000/api/admin/events/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials:true
          },
        }
      );

      toast.update(loadingToast, {
        render: "Event Updated Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate("/admin/events");
    } catch (err) {
      toast.update(loadingToast, {
        render: err.response?.data?.message || "Update failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  /* ================= UI ================= */
  return (
    
  <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-900 to-purple-900 flex justify-center items-start p-6">
    <form
      onSubmit={submit}
      className="w-full max-w-4xl bg-[#0f111a]/90 backdrop-blur-xl
                 border border-white/10 rounded-3xl shadow-2xl
                 p-10 space-y-8"
    >
      <h2 className="text-4xl font-bold text-center text-white tracking-wide">
        ✏️ Edit Event
      </h2>

      {/* IMAGE SECTION */}
      <label className="relative block cursor-pointer group">
        {(imagePreview || oldImage?.startsWith("http")) && (
          <img
            src={imagePreview || oldImage}
            alt="Event"
            className="w-full h-72 object-cover rounded-2xl
                       border border-white/20"
          />
        )}

        <div
          className="absolute inset-0 bg-black/60 opacity-0
                     group-hover:opacity-100 transition-all
                     flex items-center justify-center rounded-2xl"
        >
          <div className="flex items-center gap-3 text-white text-lg">
            <AiOutlineCloudUpload size={26} />
            <span>Change Event Image</span>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Event Title"
          className="input-dark"
          required
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Location"
          className="input-dark"
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="input-dark"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="input-dark"
          required
        />

        <input
          type="text"
          name="eventDetail"
          value={formData.eventDetail}
          onChange={handleInputChange}
          placeholder="EventDetail"
          className="input-dark"
          required
        />

        <input
          type="eventType"
          name="text"
          value={formData.eventType}
          onChange={handleInputChange}
          placeholder="EventType"
          className="input-dark"
          required
        />

        <input
          type="language"
          name="text"
          value={formData.language}
          onChange={handleInputChange}
          placeholder="Language"
          className="input-dark"
          required
        />

      <input
          type="duration"
          name="text"
          value={formData.duration}
          onChange={handleInputChange}
          placeholder="Duration"
          className="input-dark"
          required
        />

        <input
          type="timing"
          name="timing"
          value={formData.timing}
          onChange={handleInputChange}
          placeholder="Timing"
          className="input-dark"
          required
        />

      </div>

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Event Description"
        rows="5"
        className="input-dark resize-none"
        required
      />

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full py-4 rounded-2xl text-lg font-semibold
         text-white bg-linear-to-r from-orange-500 to-pink-500
         hover:from-pink-500 hover:to-purple-600
         transition-all duration-300 shadow-lg"
      >
        💾 Save Changes
      </button>
    </form>

    {/* Tailwind reusable input */}
    <style>{`
      .input-dark {
        width: 100%;
        padding: 14px;
        border-radius: 14px;
        background: transparent;
        border: 1px solid rgba(255,255,255,0.2);
        color: white;
        outline: none;
      }
      .input-dark::placeholder {
        color: rgba(255,255,255,0.5);
      }
      .input-dark:focus {
        border-color: #a855f7;
        box-shadow: 0 0 0 1px #a855f7;
      }
    `}</style>
  </div>

  );
};

export default EditEvent;
