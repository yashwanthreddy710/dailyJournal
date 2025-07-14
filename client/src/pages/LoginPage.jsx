import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";
import API from "../axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <div className="w-full max-w-sm bg-gray-900 rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">Welcome</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 ring-purple-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-xl bg-gray-800 text-white outline-none focus:ring-2 ring-purple-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-400 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-400 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
