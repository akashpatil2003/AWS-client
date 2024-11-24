import { useNavigate } from "react-router-dom"


export const columns = [
  {
    name: "Sl. No.",
    selector: (row) => row.slNo,
    width: "70px"
  },
  {
    name: "Employee ID",
    selector: (row) => row.employeeId,
    width: "120px"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    width: "120px"
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    width: "120px"
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px"
  },
  {
    name: "Days",
    selector: (row) => row.days,
    width: "120px"
  },
  {
    name: "Status",
    selector: (row) => row.status,
    width: "120px"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true"
  },
]

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  }

  return (
    <button
      className="px-4 py-1 bg-red-400 text-white-400 rounded-md font-semibold hover:bg-coral-red"
      onClick={() => handleView(Id)}
    >
      View
    </button>
  )
}

