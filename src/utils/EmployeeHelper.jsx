import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
  {
    name: "Sl. No.",
    selector: (row) => row.slNo,
    width: "80px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px"
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "150px"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "150px"
  },
  {
    name: "DoB",
    selector: (row) => row.dob,
    sortable: true,
    width: "150px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true"
  }
]

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get('https://aws-server-amber.vercel.app/api/department/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
}

export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(`https://aws-server-amber.vercel.app/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees;
}

export const EmployeeHelper = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className=" flex space-x-3">
      <button className="px-3 py-2 bg-teal-500 text-white-400 rounded-md font-semibold" onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}>View</button>

      <button className="px-3 py-2 bg-blue-500 text-white-400 rounded-md font-semibold"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${Id}`)}>Edit</button>

      <button className="px-3 py-2 bg-yellow-500 text-white-400 rounded-md font-semibold"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}>Salary</button>

      <button className="px-3 py-2 bg-red-500 text-white-400 rounded-md font-semibold"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}>Leaves</button>
    </div>
  )
}

export default EmployeeHelper;