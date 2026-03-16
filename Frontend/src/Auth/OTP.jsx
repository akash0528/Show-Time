import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef([]);

  const [params] = useSearchParams();

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const email = params.get("email");

  const handleChange = async (value, index) => {
    // Allow only numbers
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    console.log(newOtp);

    // Auto focus next box
    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle Backspace
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  const submitOtp = async (e) => {
    e.preventDefault();
    alert("OTP Submitted: " + otp.join(""));

    const otpCode = otp.join("");

    if (otpCode.length != 4) {
      alert("Enter 4 digit OTP");
      return;
    }

    try {
      const res = await axios.post(
        "https://show-time-backend.onrender.com/user/verify-otp",
        {
          email: email,
          otp: otpCode,
        },
        {
          withCredentials: true,
        },
      );

      const UserData = {
        name: res.data.User.fullName,
        email: res.data.User.email,
        id: res.data.User._id,
      };
      login(UserData);

      //clear inputs after submit
      setOtp(["", "", "", ""]);

      inputs.current[0].focus();

      navigate("/Home");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-800 via-pink-600 to-blue-500">
      <form
        onSubmit={submitOtp}
        className="bg-white/15 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20 w-85 text-center"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Verify OTP</h1>
        <p className="text-white/80 text-sm mb-6">
          Enter the 4-digit verification code
        </p>

        <div className="flex justify-between mb-8">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              maxLength={1}
              type="text"
              required
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md text-white  text-2xl font-semibold text-center border border-white/30 focus:border-yellow-300 transition outline-none"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-yellow-400 font-bold text-black cursor-pointer hover:bg-yellow-500 transition active:scale-95"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default OtpForm;
