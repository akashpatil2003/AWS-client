import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axios from 'axios'

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        const response = await axios.put("https://aws-server-fnf7.onrender.com/api/setting/change-password", setting, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          alert(response.data.message);
          navigate("/employee-dashboard");
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error)
        }
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="font-palanquin font-bold text-2xl  text-cente mb-6">Change Password</h2>
      <form onSubmit={handleSubmit}>

        <div className='mb-4'>
          <label htmlFor="email" className="text-sm text-slate-gray font-medium">Old Password</label>
          <input
            type="password"
            name='oldPassword'
            className="w-full mt-1 p-2 border-[1px] border-gray-300 rounded-md"
            placeholder="Change Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="email" className="text-sm text-slate-gray font-medium">New Password</label>
          <input
            type="password"
            name='newPassword'
            className="w-full mt-1 p-2 border-[1px] border-gray-300 rounded-md"
            placeholder="New Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="email" className="text-sm text-slate-gray font-medium">Confirm Password</label>
          <input
            type="password"
            name='confirmPassword'
            className="w-full mt-1 p-2 border-[1px] border-gray-300 rounded-md"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-coral-red hover:bg-white-400 hover:text-coral-red border-[1px] hover:border-coral-red text-white font-semibold py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings