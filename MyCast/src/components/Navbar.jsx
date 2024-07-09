import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
            <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-purple-500' src={assets.arrow_left} alt="" />
            <img onClick={() => navigate(+1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-purple-500' src={assets.arrow_right} alt="" />
        </div>
        <div className='flex items-center gap-4'>
            <p className='bg-purple-500 text-black w-20 h-10 rounded-full flex items-center justify-center font-bold'>MyCast</p>
        </div>
      </div> 
      <div className='flex items-center gap-2 mt-4'>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-purple-500 hover:text-black font-semibold'>All Podcasts</p>
        <button></button>
        <button></button>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-purple-500 hover:text-black font-semibold'>A-Z</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-purple-500 hover:text-black font-semibold'>Z-A</p>
      </div>
    </>
  )
}

export default Navbar
