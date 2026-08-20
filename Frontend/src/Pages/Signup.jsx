import { useState } from "react";
import axios from "axios";
import { UserPlus } from "lucide-react";
import { API } from "../config/api";

function Signup({ switchToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "female",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/signup`, form);
      switchToLogin();
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col">
      
      {/* Top Left Brand */}
      <div className="p-6 text-white text-2xl font-extrabold tracking-wide">
        InsightCart <span className="text-yellow-300">AI</span>
      </div>

      {/* Center Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          
          <div className="flex flex-col items-center mb-6">
            <UserPlus size={40} className="text-indigo-600 mb-2" />
            <h2 className="text-2xl font-bold">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />
            <select
              name="gender"
              onChange={handleChange}
              value={form.gender}
              className="w-full p-3 border rounded-lg bg-white"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              onClick={switchToLogin}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
