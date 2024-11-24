import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { DepartmentHelper, columns } from '../../utils/DepartmentHelper';
import axios from 'axios';
const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = async () => {
    fetchDepartments();
  }

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get('https://aws-server-dusky.vercel.app/api/department/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.data.success) {
        let slNo = 1;
        const data = await response.data.departments.map((dep) => (
          {
            _id: dep._id,
            slNo: slNo++,
            dep_name: dep.dep_name,
            description: dep.description,
            action: (<DepartmentHelper Id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
          }
        ))
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  }

  useEffect(() => {

    fetchDepartments();
  }, [])

  const filterDepartments = (e) => {
    const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredDepartments(records);
  }

  return (
    <>{depLoading ? <h1>Loading...</h1> :
      <div className='p-4'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Departments</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input
            type='text'
            placeholder='Search By Dep Name'
            className='px-4 py-0.5'
            onChange={filterDepartments}
          />
          <Link to="/admin-dashboard/add-department" className='px-4 py-1 bg-coral-red text-white-400 rounded-lg font-semibold hover:bg-white-400 hover:text-coral-red duration-200 '>Add New Department</Link>
        </div>
        <div className='mt-6'>
          <DataTable
            columns={columns}
            data={filteredDepartments ? filteredDepartments : departments}
            pagination
          />
        </div>
      </div>
    }</>
  )
}

export default Departments;