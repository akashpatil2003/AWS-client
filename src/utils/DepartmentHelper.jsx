import { useNavigate } from "react-router-dom"
import axios from "axios";

export const columns = [
  {
    name: "Sl. No.",
    selector: (row) => row.slNo,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action
  }
]

export const DepartmentHelper = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
    try {
      if (!confirmDelete) {
        return;
      }
      const response = await axios.delete(`https://aws-server-fnf7.onrender.com/api/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success) {
        onDepartmentDelete();
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }
  return (
    <div className=" flex space-x-3">
      <button className="px-3 py-1 bg-green-500 text-white-400 rounded-md font-semibold" onClick={() => navigate(`/admin-dashboard/department/${Id}`)}>Edit</button>
      <button className="px-3 py-1 bg-red-500 text-white-400 rounded-md font-semibold"
        onClick={() => handleDelete(Id)}>Delete</button>
    </div>
  )
}

