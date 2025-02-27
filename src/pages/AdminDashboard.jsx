import React from 'react'
import { useAuth } from '../context/authContext'
import AdminSideBar from '../components/dashboard/AdminSideBar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <div className='flex'>
      <AdminSideBar />
      <div className='flex-1 bg-gray-200 h-screen '>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard