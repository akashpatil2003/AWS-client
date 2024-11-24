import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      ;
      const departments = await fetchDepartments();
      setDepartments(departments);
    }
    getDepartments();
  }, [])


  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://aws-server-dusky.vercel.app/api/salary/add`, salary, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success) {
        alert(response.data.message);
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }



  return (
    <>{!departments ? <div>Loading...</div> : (
      <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-3xl font-bold mb-6'>Add Salary</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

            <div>
              <label className='block text-sm text-slate-gray font-semibold'>Department</label>
              <select
                name='department'
                onChange={handleDepartment}
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
              <label className='block text-sm text-slate-gray font-semibold'>Employee</label>
              <select
                name='employeeId'
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-slate-gray rounded-md cursor-pointer'
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId} - {emp.userId.name}

                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm text-slate-gray font-semibold'>Basic Salary</label>
              <input
                type="number"
                name='basicSalary'
                onChange={handleChange}
                placeholder='Enter Employee Salary'
                className='mt-1 p-2 w-full border border-slate-gray rounded-md'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-slate-gray font-semibold'>Allowances</label>
              <input
                type="number"
                name='allowances'
                onChange={handleChange}
                placeholder='Allowances'
                className='mt-1 p-2 w-full border border-slate-gray rounded-md'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-slate-gray font-semibold'>Deductions</label>
              <input
                type="number"
                name='deductions'
                onChange={handleChange}
                placeholder='Deductions'
                className='mt-1 p-2 w-full border border-slate-gray rounded-md'
                required
              />
            </div>

            <div>
              <label className='block text-sm text-slate-gray font-semibold'>Pay Date</label>
              <input
                type="date"
                name='payDate'
                onChange={handleChange}
                className='mt-1 p-2 w-full border border-slate-gray rounded-md'
                required
              />
            </div>

          </div>
          <button
            type='submit'
            className='mt-4 bg-coral-red text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out'
          >
            Add Salary
          </button>
        </form>
      </div>
    )}</>
  )
}

export default AddSalary;