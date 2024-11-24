import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      ;
      const departments = await fetchDepartments();
      setDepartments(departments);
    }
    getDepartments();
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    })

    try {
      const response = await axios.post("https://aws-server-amber.vercel.app/api/employee/add", formDataObj, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-3xl font-bold mb-6'>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Name</label>
            <input
              type="text"
              name='name'
              onChange={handleChange}
              placeholder='Enter Employee Name'
              className='mt-1 p-2 w-full border border-slate-gray rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Email</label>
            <input
              type="email"
              name='email'
              onChange={handleChange}
              placeholder='Enter Employee email'
              className='mt-1 p-2 w-full border border-slate-gray rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Employee Id</label>
            <input
              type="text"
              name='employeeId'
              onChange={handleChange}
              placeholder='Enter Employee Finger Id'
              className='mt-1 p-2 w-full border border-slate-gray rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Date of Birth</label>
            <input
              type="date"
              name='dob'
              onChange={handleChange}
              className='mt-1 p-2 w-full border border-slate-gray rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Gender</label>
            <select
              name='gender'
              onChange={handleChange}
              className='mt-1 p-2 w-full border border-slate-gray rounded-md cursor-pointer'
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Designation</label>
            <input
              type="text"
              name='designation'
              onChange={handleChange}
              placeholder='Enter Employee Designation'
              className='mt-1 p-2 w-full border border-slate-gray rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Department</label>
            <select
              name='department'
              onChange={handleChange}
              className='mt-1 p-2 w-full border border-slate-gray rounded-md cursor-pointer'
              required
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>{department.dep_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Salary</label>
            <input
              type="number"
              name='salary'
              onChange={handleChange}
              placeholder='Enter Employee Salary'
              className='mt-1 p-2 w-full border border-slate-gray rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Password</label>
            <input
              type="password"
              name='password'
              onChange={handleChange}
              placeholder='********'
              className='mt-1 p-2 w-full border border-slate-gray rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Role</label>
            <select
              name='role'
              onChange={handleChange}
              className='mt-1 p-2 w-full border border-slate-gray rounded-md cursor-pointer'
              required
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div>
            <label className='block text-sm text-slate-gray font-semibold'>Profile Picture</label>
            <input
              type="file"
              name='image'
              onChange={handleChange}
              placeholder='Upload Profile Picture'
              accept='image/*'
              className='mt-1 p-2 w-full border border-slate-gray rounded-md'
            />
          </div>
        </div>
        <button
          type='submit'
          className='mt-4 bg-coral-red text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out'
        >
          Add Employee
        </button>
      </form>
    </div>
  )
}

export default AddEmployee