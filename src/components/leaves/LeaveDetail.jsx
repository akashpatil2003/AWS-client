import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchleave = async () => {
      try {
        const response = await axios.get(`https://aws-server-fnf7.onrender.com/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
    fetchleave();
  }, [])

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://aws-server-fnf7.onrender.com/api/leave/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <>{leave ? (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Name:</p>
            <p className="font-medium">{leave.employeeId.userId.name}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Employee Id:</p>
            <p className="font-medium">{leave.employeeId.employeeId}</p>
          </div>

          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Leave Type:</p>
            <p className="font-medium">{leave.leaveType}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Reason</p>
            <p className="font-medium">{leave.reason}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Department:</p>
            <p className="font-medium">{leave.employeeId.department.dep_name}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Start Date:</p>
            <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Start Date:</p>
            <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-3 mb-5 items-center">
            <p className="text-lg font-bold">
              {leave.status === "Pending" ? "Action:" : "Status:"}
            </p>
            {leave.status === "Pending" ? (
              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white-400 px-4 py-2 rounded-md mx-1 font-bold"
                  onClick={() => changeStatus(leave._id, "Approved")}
                >Approve</button>
                <button
                  className="bg-coral-red hover:bg-red-500 text-white-400 px-4 py-2 rounded-md mx-1 font-bold"
                  onClick={() => changeStatus(leave._id, "Rejected")}
                >Reject</button>
              </div>
            ) : <p className="font-medium">{leave.status}</p>}

          </div>
        </div>
      </div>
    ) : <p>Loading...</p>}
    </>
  )
}

export default LeaveDetail;