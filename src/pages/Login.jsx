import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config.js";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      if (response.status === 200) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "manager") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.message);
      } else {
        setError("Server Error");
      }

    }
  }

  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-coral-red from-40% to-white-400 to-60% space-y-6">
      <h1 className="font-palanquin font-bold text-4xl text-white text-center">Automated Workspace</h1>

      <div className="border shadow-3xl rounded-xl shadow-slate-gray p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-slate-gray font-montserrat">Email</label>
            <input
              value={email}
              type="email"
              className="w-full px-3 py-2 border-[1px] border-gray-400 rounded-md"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-slate-gray font-montserrat">Password</label>
            <input
              value={password}
              type="password"
              className="w-full px-3 py-2 border-[1px] border-gray-400 rounded-md "
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="password" className="block text-slate-gray">
              <input type="checkbox" className="form-checkbox cursor-pointer" />
              <span className="ml-2 text-slate-gray">Remember me</span>
            </label>
            <a href="#" className="text-coral-red hover:text-red-600">Forgot Password</a>

          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-coral-red hover:bg-white-400 hover:text-coral-red border-[1px] hover:border-coral-red text-white font-semibold py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Login;