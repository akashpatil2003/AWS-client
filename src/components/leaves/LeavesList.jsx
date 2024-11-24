import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/authContext'

const LeavesList = () => {
  const [leaves, setLeaves] = useState([]);
  let slNo = 1;
  const { id } = useParams();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`https://aws-server-fnf7.onrender.com/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    fetchLeaves();
  }, [])
  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Leaves</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input type="text" placeholder='Search'
          className='px-4 py-0.5 border'
        />
        <Link
          to="/employee-dashboard/add-leave"
          className='px-4 py-2 bg-coral-red text-white-400 rounded-lg'
        >Add New Leave
        </Link>
      </div>

      <table className='mx-auto w-4/5 text-md text-left text-gray-500 mt-5'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
          <tr className='text-center'>
            <th className='px-6 py-3'>Sl No.</th>
            <th className='px-6 py-3'>Leave Type</th>
            <th className='px-6 py-3'>From Date</th>
            <th className='px-6 py-3'>To Date</th>
            <th className='px-6 py-3'>Reason</th>
            <th className='px-6 py-3'>Applied Date</th>
            <th className='px-6 py-3'>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr
              key={leave._id}
              className='bg-white border-b  border-gray-200 text-center'
            >
              <td className='px-6 py-1'>{slNo++}</td>
              <td className='px-6 py-1'>{leave.leaveType}</td>
              <td className='px-6 py-1'>{new Date(leave.startDate).toLocaleDateString()}</td>
              <td className='px-6 py-1'>{new Date(leave.endDate).toLocaleDateString()}</td>
              <td className='px-6 py-1'>{leave.reason}</td>
              <td className='px-6 py-1'>{new Date(leave.createdAt).toLocaleDateString()}</td>
              <td className='px-6 py-1'>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeavesList