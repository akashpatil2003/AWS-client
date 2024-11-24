import { useAuth } from '../context/authContext'
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';
import EmployeeSidebar from '../components/employeeDashboard/EmployeeSidebar';

const EmployeeDashboard = () => {
  const { loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return (
    <div className='flex'>
      <EmployeeSidebar />
      <div className='flex-1 bg-gray-200 h-screen '>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default EmployeeDashboard