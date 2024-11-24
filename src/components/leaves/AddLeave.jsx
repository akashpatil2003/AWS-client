import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeave = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id
  })
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://aws-server-amber.vercel.app/api/leave/add', leave, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        alert(response.data.message);
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error + error.message);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevData) => ({ ...prevData, [name]: value }))
  }
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='block text-sm font-medium text-slate-gray'>
            Leave Type
          </label>
          <select
            name='leaveType'
            onChange={handleChange}
            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
          >
            <option value=''>Select Leave Type</option>
            <option value='Sick Leave'>Sick Leave</option>
            <option value='Casual Leave'>Casual Leave</option>
            <option value='Annual Leave'>Annual Leave</option>
          </select>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-slate-gray'>
              From Date
            </label>
            <input
              type='date'
              name='startDate'
              onChange={handleChange}
              className='mt-1 p-2 block block w-full border border-gray-300 rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-gray'>
              To Date
            </label>
            <input
              type='date'
              name='endDate'
              onChange={handleChange}
              className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-gray'>
              Reason
            </label>
            <textarea
              name='reason'
              placeholder='Reason for leave'
              onChange={handleChange}
              className='w-full border border-gray-300'
              required
            />
          </div>

        </div>
        <button
          type='submit'
          className='w-full bg-coral-red text-white py-2 rounded-md hover:bg-red-500'
        > Apply </button>
      </form>
    </div>
  )
}

export default AddLeave