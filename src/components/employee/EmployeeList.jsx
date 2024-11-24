import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import EmployeeHelper, { columns } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);


  const filterEmplyoees = (e) => {
    const records = employees.filter((emp) => emp.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredEmployees(records);
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('https://aws-server-dusky.vercel.app/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        if (response.data.success) {
          let slNo = 1;
          const data = await response.data.employees.map((emp) => (
            {
              _id: emp._id,
              slNo: slNo++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              employeeId: emp.employeeId,
              action: (<EmployeeHelper Id={emp._id} />)
            }
          ))
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    }
    fetchEmployees();
  }, [])

  return (
    <div className='p-4'>
      <div className='text-center py-2'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input
          type='text'
          placeholder='Search By Emp Name'
          className='px-4 py-0.5'
          onChange={filterEmplyoees}
        />
        <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-coral-red text-white-400 rounded-lg font-semibold hover:bg-white-400 hover:text-coral-red duration-200 '>Add New Employee</Link>
      </div>
      <div className='mt-4'>
        <DataTable columns={columns} data={filteredEmployees} pagination />
      </div>
    </div>
  )
}

export default EmployeeList