import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/authContext';


const EmployeeSideBar = () => {
  const { user } = useAuth();
  return (
    <div className='bg-gray-800 text-white-400 h-screen fixef left-0 top-0 bottom-0 space-y-2 w-72'>
      <div className='bg-coral-red h-12 flex items-center justify-center '>
        <h3 className='text-2xl text-center font-palanquin'>Automated Workspace</h3>
      </div>
      <div className='px-4 flex flex-col gap-5'>
        <NavLink to="/employee-dashboard"
          className={({ isActive }) => `${isActive ? "bg-coral-red scale-105" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded-lg hover:scale-105 duration-200 text-xl`} end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({ isActive }) => `${isActive ? "bg-coral-red scale-105" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded-lg hover:scale-105 duration-200 text-xl`}>
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({ isActive }) => `${isActive ? "bg-coral-red scale-105" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded-lg hover:scale-105 duration-200 text-xl`}>
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={({ isActive }) => `${isActive ? "bg-coral-red scale-105" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded-lg hover:scale-105 duration-200 text-xl`}>
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>
        <NavLink to="/employee-dashboard/setting" className={({ isActive }) => `${isActive ? "bg-coral-red scale-105" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded-lg hover:scale-105 duration-200 text-xl`}>
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  )
}

export default EmployeeSideBar