
import { FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'
const EmployeeSummary = () => {
  const { user } = useAuth();
  return (
    <div className='p-6'>
      <div className='rounded-lg flex bg-white h-20 w-1/2'>
        <div className={`text-3xl flex justify-center items-center bg-coral-red text-white-400 px-4 rounded-lg`}>
          <FaUsers />
        </div>
        <div className='pl-4 py-1 flex flex-col gap-2'>
          <p className='text-lg font-semibold'>Welcome Back</p>
          <p className='text-xl font-bold'>{user.name}</p>
        </div>
      </div>
    </div>

  )
}

export default EmployeeSummary