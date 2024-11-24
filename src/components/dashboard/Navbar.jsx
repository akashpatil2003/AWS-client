import React from 'react'
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className='flex items-center text-white-400 justify-between h-12 bg-coral-red px-5'>
      <p className='font-semibold text-lg'>Welcome {user.name} </p>
      <button className='px-4 font-semibold text-lg text-black hover:bg-slate-gray hover:text-white-400 duration-200 bg-white-400 py-2 rounded-lg ' onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar