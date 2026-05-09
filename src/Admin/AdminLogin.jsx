import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  // ADD THIS
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/admin/login", formData);

      console.log(res.data);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Navigate to Dashboard
      navigate("/admin-dashboard");

    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8 sm:py-12">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">

        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-xs sm:text-sm">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-black mb-1 sm:mb-2">
          MoonLight Motion
        </h1>

        <p className="text-gray-500 text-sm sm:text-base text-center mb-6 sm:mb-8">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

          {/* Email */}
          <div>
            <label className="block text-black font-medium text-sm sm:text-base mb-1.5 sm:mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter an Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl text-black text-sm sm:text-base placeholder-gray-300 focus:outline-none focus:border-black transition-colors"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-black font-medium text-sm sm:text-base mb-1.5 sm:mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter a Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl text-black text-sm sm:text-base placeholder-gray-300 focus:outline-none focus:border-black transition-colors"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-gray-900 active:scale-[0.98] transition-all mt-2"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;