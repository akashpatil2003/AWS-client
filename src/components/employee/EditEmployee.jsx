import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";

const EditEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    salary: "",
    department: "",
  });
  const [departments, setDepartments] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      ;
      const departments = await fetchDepartments();
      setDepartments(departments);
    }
    getDepartments();
  }, [])

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://aws-server-amber.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.data.success) {
          const employee = response.data.employee;
          console.log(employee);

          setEmployee((prevData) => ({
            ...prevData,
            name: employee.userId.name,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department.dep_name
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
    fetchEmployee();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }))

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://aws-server-amber.vercel.app/api/employee/${id}`, employee, {
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
    <>{!employee ? <div>Loading...</div> : (
      <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-3xl font-bold mb-6'>Edit Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm text-slate-gray font-semibold'>Name</label>
              <input
                type="text"
                name='name'
                value={employee.name}
                onChange={handleChange}
                placeholder='Enter Employee Name'
                className='mt-1 p-2 w-full border border-slate-gray rounded-md'
                required
              />
            </div>
            <div>
              <label className='block text-sm text-slate-gray font-semibold'>Designation</label>
              <input
                type="text"
                name='designation'
                value={employee.designation}
                onChange={handleChange}
                placeholder='Enter Employee Designation'
                className='mt-1 p-2 w-full border border-slate-gray rounded-md'
                required
              />
            </div>
            <div>
              <label className='block text-sm text-slate-gray font-semibold'>Salary</label>
              <input
                type="number"
                name='salary'
                value={employee.salary}
                onChange={handleChange}
                placeholder='Enter Employee Salary'
                className='mt-1 p-2 w-full border border-slate-gray rounded-md'
                required
              />
            </div>
            <div>
              <label className='block text-sm text-slate-gray font-semibold'>Department</label>
              <select
                name='department'
                onChange={handleChange}
                value={employee.department}
                className='mt-1 p-2 w-full border border-slate-gray rounded-md cursor-pointer'
                required
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>{department.dep_name}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type='submit'
            className='mt-4 bg-coral-red text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out'
          >
            Save Employee
          </button>
        </form>
      </div>
    )}</>
  )
}

export default EditEmployee