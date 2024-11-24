import React from 'react'

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className='rounded-lg flex bg-white h-20 min-w-40 max-w-60'>
      <div className={`text-3xl flex justify-center items-center ${color} text-white-400 px-4 rounded-lg`}>
        {icon}
      </div>
      <div className='pl-4 py-1 flex flex-col gap-2'>
        <p className='text-lg font-semibold'>{text}</p>
        <p className='text-xl font-bold'>{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard