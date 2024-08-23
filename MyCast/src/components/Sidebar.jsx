import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../spotify-assets/assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarVisible(false);
  };

  return (
    <>
      <div className="lg:hidden p-4">
        <button onClick={toggleSidebar}>
          <img className="w-8" src={assets.hamburger_icon} alt="Menu" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:transform-none lg:relative lg:translate-x-0 lg:w-[25%] lg:flex`}
      >
        <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={() => handleNavigation("/podcasts")}
          >
            <img className="w-6" src={assets.home_icon} alt="Home" />
            <p className="font-bold">Home</p>
          </div>
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={() => setSearchVisible(!searchVisible)}
          >
            <img className="w-6" src={assets.search_icon} alt="Search" />
            <p className="font-bold">{searchVisible ? "" : "Search"}</p>
            {searchVisible && (
              <input
                type="text"
                placeholder="Search podcasts"
                className="bg-white text-black px-4 py-1 rounded-full"
              />
            )}
          </div>
        </div>
        <div className="h-[85%] rounded">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img className="w-8" src={assets.stack_icon} alt="Library" />
              <p className="font-semibold">Library</p>
            </div>
          </div>
          <div className='bg-[#121212] h-[85%] rounded'>
            <div className='p-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img onClick={() => navigate ('/favorites')} className='w-8 cursor-pointer'src={assets.stack_icon} alt="" />
                    <p onClick={() => navigate ('/favorites')} className='font-semibold cursor-pointer hover:text-purple-500'>Favorites</p> 
                </div>
                <div className='flex items-center gap-3'>
                    <img onClick={() => navigate ('/favorites')} className= 'w-5 cursor-pointer' src={assets.arrow_icon} alt="" />
                    <img className= 'w-5' src={assets.plus_icon} alt="" />
                </div>
            </div>
        </div>
          <div className="p-4 bg-[#2563EB] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
            <h1>Let's find some podcasts to follow</h1>
            <p className="font-light">We'll keep you updated on new episodes</p>
            <button
              className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
              onClick={() => handleNavigation("/podcasts")}
            >
              Discover New Shows
            </button>
          </div>
        </div>
      </div>
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
