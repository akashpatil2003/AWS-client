import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns } from '../../utils/AttendnaceHelper'
import axios from 'axios';
import DataTable from 'react-data-table-component';

const EmployeeList = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendances, setFilteredAttendances] = useState([]);


  const filterAttendances = (e) => {
    const records = attendances.filter((emp) => emp.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredAttendances(records);
  }

  useEffect(() => {
    const fetchAttendances = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/attendance');
        console.log(response.data.attendances);

        if (response.data.success) {
          let slNo = 1;
          const data = await response.data.attendances.map((attend) => (
            {
              slNo: slNo++,
              name: attend.userId.name,
              employeeId: attend.employeeId.employeeId,
              dep_name: attend.department.dep_name,
              date: new Date(attend.date).toLocaleDateString(),
              inTime: new Date(attend.inTime).toLocaleTimeString(),
              outTime: attend.outTime ? new Date(attend.outTime).toLocaleTimeString() : "-"
            }
          ))
          setAttendances(data);
          setFilteredAttendances(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchAttendances();
  }, [])

  return (
    <div className='p-4'>
      <div className='text-center py-2'>
        <h3 className='text-2xl font-bold'>Manage attendances</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input
          type='text'
          placeholder='Search By Emp Name'
          className='px-4 py-0.5'
          onChange={filterAttendances}
        />
        {console.log(attendances)
        }
      </div>
      <div className='mt-4'>
        <DataTable columns={columns} data={filteredAttendances} pagination />
      </div>
    </div>
  )
}

export default EmployeeList