import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../spotify-assets/assets/assets";

// Navbar component accepts an onSort function as a prop
const Navbar = ({ onSort }) => {
  const navigate = useNavigate(); // useNavigate hook allows navigation between routes

  return (
    <>
      {/* Top navbar section with navigation icons and the app title */}
      <div className='w-full flex justify-between items-center font-semibold mb-4'>
        <div className='flex items-center gap-2'>
          {/* Home icon (visible only on smaller screens) */}
          <img 
            onClick={() => navigate('/')} 
            className='w-8 bg-black p-2 rounded-2xl lg:hidden cursor-pointer hover:bg-purple-500'
            src={assets.home_icon} 
            alt="Home Icon" 
          />
          {/* Backward navigation icon */}
          <img 
            onClick={() => navigate(-1)} 
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-purple-500' 
            src={assets.arrow_left} 
            alt="Back Icon" 
          />
          {/* Forward navigation icon */}
          <img 
            onClick={() => navigate(+1)} 
            className='w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-purple-500' 
            src={assets.arrow_right} 
            alt="Forward Icon" 
          />
        </div>
        {/* App title or logo */}
        <div className='flex items-center gap-4'>
          <p className='bg-purple-500 text-black w-20 h-10 rounded-full flex items-center justify-center font-bold'>
            MyCast
          </p>
        </div>
      </div> 

      {/* Sorting options section */}
      <div className='flex items-center gap-2 mt-4'>
        {/* Button to show all podcasts */}
        <p 
          className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-purple-500 hover:text-black font-semibold'>
          All Podcasts
        </p>
        {/* Sorting button to sort podcasts alphabetically from A-Z */}
        <p 
          className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-purple-500 hover:text-black font-semibold'
          onClick={() => onSort("asc")}>
          A-Z
        </p>
        {/* Sorting button to sort podcasts alphabetically from Z-A */}
        <p 
          className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-purple-500 hover:text-black font-semibold'
          onClick={() => onSort("desc")}>
          Z-A
        </p>
        {/* Sorting button to sort podcasts by latest */}
        <p 
          className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-purple-500 hover:text-black font-semibold'
          onClick={() => onSort("latest")}>
          Latest
        </p>
        {/* Sorting button to sort podcasts by oldest */}
        <p 
          className='bg-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-purple-500 hover:text-black font-semibold'
          onClick={() => onSort("oldest")}>
          Oldest
        </p>
      </div>
    </>
  );
};

export default Navbar;
