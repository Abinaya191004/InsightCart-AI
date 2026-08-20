import { useState } from "react";
import axios from "axios";
import { LogIn } from "lucide-react";
import { API } from "../config/api";

function Login({ switchToSignup }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API}/api/auth/login`,
        form
      );

      console.log("LOGIN RESPONSE:", res.data); // 👈 debug

      // ✅ store token
      localStorage.setItem("token", res.data.token);

      // ✅ store user (IMPORTANT)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      window.location.reload();

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold">
            InsightCart <span className="text-indigo-600">AI</span>
          </h1>
          <div className="flex justify-center mt-3">
            <LogIn size={36} className="text-indigo-600" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={switchToSignup}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
