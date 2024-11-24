import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let slNo = 1;
  const { user } = useAuth();

  useEffect(() => {
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/salary/${id}/${user.role}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.data.success) {
          setSalaries(response.data.salary);
          setFilteredSalaries(response.data.salary);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
    fetchSalaries();
  }, [])


  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((leave) => {
      leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase());
    });
    setFilteredSalaries(filteredRecords);
  }

  return (
    <>
      {filteredSalaries === null ? (
        <h1>Loading...</h1>
      ) : (
        <div className='overflow-x-auto p-5'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold'>Salary History</h2>
          </div>
          <div className='flex justify-end my-2'>
            <input
              type="text"
              placeholder="Search by Employee ID"
              className='border px-2 rounded-md py-0.5 border-gray-400'
              onChange={filterSalaries}
            />
          </div>
          {filteredSalaries.length > 0 ? (
            <table className='mx-auto w-4/5 text-sm text-left text-gray-500'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200'>
                <tr className='text-center'>
                  <th className='px-6 py-3'>Sl No.</th>
                  <th className='px-6 py-3'>Employee ID</th>
                  <th className='px-6 py-3'>Salary</th>
                  <th className='px-6 py-3'>Allowance</th>
                  <th className='px-6 py-3'>Deduction</th>
                  <th className='px-6 py-3'>Total</th>
                  <th className='px-6 py-3'>Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary._id}
                    className='bg-white border-b  border-gray-200 text-center'
                  >
                    <td className=''>{slNo++}</td>
                    <td className=''>{salary.employeeId.employeeId}</td>
                    <td className=''>{salary.basicSalary}</td>
                    <td className=''>{salary.allowances}</td>
                    <td className=''>{salary.deductions}</td>
                    <td className=''>{salary.netSalary}</td>
                    <td className=''>{new Date(salary.payDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className='text-center mt-10'>
              <h2 className='text-2xl font-bold'>No Salary Records</h2>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ViewSalary