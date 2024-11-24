import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import DataTable from 'react-data-table-component';

const AdminLeaves = () => {
  const [leaves, setleaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/leave', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.data.success) {
        let slNo = 1;
        const data = await response.data.leaves.map((leave) => (
          {
            _id: leave._id,
            slNo: slNo++,
            employeeId: leave.employeeId.employeeId,
            name: leave.employeeId.userId.name,
            leaveType: leave.leaveType,
            department: leave.employeeId.department.dep_name,
            days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
            status: leave.status,
            action: <LeaveButtons Id={leave._id} />
          }
        ))
        setleaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  useEffect(() => {
    fetchLeaves()
  }, [])

  const filterLeaves = (e) => {
    const data = leaves.filter((leave) => leave.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredLeaves(data);
  }

  const filterByBtn = (status) => {
    const data = leaves.filter((leave) => leave.status.toLowerCase().includes(status.toLowerCase()));
    setFilteredLeaves(data);
  }

  return (
    <> {setFilteredLeaves ? (

      <div className='p-6'>
        <div className='text-center mb-10'>
          <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center mb-5'>
          <input
            type="text"
            placeholder='Search'
            className='px-4 py-0.5 border'
            onChange={filterLeaves}
          />
          <div className='flex gap-2'>
            <button
              to="/leaveloyee-dashboard/add-leave"
              className='px-4 py-2 bg-coral-red text-white-400 rounded-lg'
              onClick={() => filterByBtn("pending")}
            >Pending
            </button>
            <button
              to="/leaveloyee-dashboard/add-leave"
              className='px-4 py-2 bg-coral-red text-white-400 rounded-lg'
              onClick={() => filterByBtn("approved")}
            >Approved
            </button>
            <button
              to="/leaveloyee-dashboard/add-leave"
              className='px-4 py-2 bg-coral-red text-white-400 rounded-lg'
              onClick={() => filterByBtn("rejected")}
            >Rejected
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={filteredLeaves} pagination />
      </div>)
      : (
        <div className='text-center text-2xl font-bold'>Loading</div>
      )
    }
    </>
  )
}

export default AdminLeaves