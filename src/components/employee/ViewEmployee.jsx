import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const ViewEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [empLoading, setEmpLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(`https://aws-server-amber.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    }
    fetchEmployee();
  }, [])
  return (
    <>{employee ? (
      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Name:</p>
            <p className="font-medium">{employee.userId.name}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Employee Id:</p>
            <p className="font-medium">{employee.employeeId}</p>
          </div>

          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Date Of Birth:</p>
            <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">gender:</p>
            <p className="font-medium">{employee.gender}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Department:</p>
            <p className="font-medium">{employee.department.dep_name}</p>
          </div>
        </div>
      </div>
    ) : <p>Loading...</p>}
    </>
  )
}

export default ViewEmployee