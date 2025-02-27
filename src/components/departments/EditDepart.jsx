import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
const EditDepart = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(`https://aws-server-fnf7.onrender.com/api/department/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (response.data.success) {
          setDepartment(response.data.department);

        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    }
    fetchDepartment();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://aws-server-fnf7.onrender.com/api/department/${id}`, department, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.data.success) {
        alert(response.data.message);
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <>{depLoading ? <h1>Loading...</h1> :
      <div className='max-w-3xl mx-auto mt-10 bg-white-400 p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Edit Department</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label
                htmlFor='dep_name'
                className='text-sm font-medium text-slate-gray'
              >Department Name</label>
              <input
                type='text'
                placeholder='Enter Department Name'
                name='dep_name'
                onChange={handleChange}
                value={department.dep_name}
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                required
              />
            </div>
            <div>
              <label
                htmlFor='description'
                className='text-sm font-medium text-slate-gray'
              >Description</label>
              <textarea
                type='text'
                placeholder='Enter Description'
                name='description'
                onChange={handleChange}
                value={department.description}
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                required
              />
            </div>
            <button
              type='submit'
              className='w-full mt-6 bg-coral-red hover:bg-red-500 text-white py-2 rounded-lg font-semibold  duration-200'
            >Save </button>
          </div>
        </form>
      </div>
    }</>
  )
}

export default EditDepart