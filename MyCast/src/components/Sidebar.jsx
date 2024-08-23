import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../spotify-assets/assets/assets";

const Sidebar = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const [searchVisible, setSearchVisible] = useState(false); // State to manage the visibility of the search bar
  const [sidebarVisible, setSidebarVisible] = useState(false); // State to manage the visibility of the sidebar in mobile view

  // Handle navigation and close the sidebar in mobile view
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
    setSidebarVisible(false); // Close the sidebar after navigating
  };

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full" // Conditional classes for showing/hiding sidebar in mobile view
        } transition-transform duration-300 lg:transform-none lg:relative lg:translate-x-0 lg:w-[25%] lg:flex`}
      >
        {/* Sidebar content */}
        <div className="bg-[#121212] h-[100%] rounded flex flex-col gap-4 pt-4">
          {/* Home button */}
          <div
            className="flex items-center gap-3 pl-4 py-2 hover:bg-[#333] rounded-md cursor-pointer transition-colors duration-200"
            onClick={() => handleNavigation("/")}
          >
            <img className="w-6" src="/myCast.png" alt="Home" />
            <p className="font-bold">MyCast</p>
          </div>
          {/* Podcasts button */}
          <div
            className="flex items-center gap-3 pl-4 py-2 hover:bg-[#333] rounded-md cursor-pointer transition-colors duration-200"
            onClick={() => handleNavigation("/podcasts")}
          >
            <img className="w-6" src={assets.home_icon} alt="Podcasts" />
            <p className="font-bold">Home</p>
          </div>
          {/* Search button and input */}
          <div
            className="flex items-center gap-3 pl-4 py-2 hover:bg-[#333] rounded-md cursor-pointer transition-colors duration-200"
            onClick={() => setSearchVisible(!searchVisible)} // Toggle search input visibility
          >
            <img className="w-6" src={assets.search_icon} alt="Search" />
            <p className="font-bold">{searchVisible ? "" : "Search"}</p> {/* Hide "Search" text when the input is visible */}
          </div>
          {/* Search input field, visible only when searchVisible is true */}
          {searchVisible && (
            <input
              type="text"
              placeholder="Search podcasts"
              className="bg-[#333] text-white px-4 py-2 mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          {/* Favorites button */}
          <div
            className="flex items-center gap-3 pl-4 py-2 hover:bg-[#333] rounded-md cursor-pointer transition-colors duration-200"
            onClick={() => handleNavigation("/favorites")}
          >
            <img className="w-6" src={assets.stack_icon} alt="Favorites" />
            <p className="font-bold">Favorites</p>
          </div>
        </div>
      </div>

      {/* Overlay for sidebar in mobile view, closes sidebar when clicked */}
      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarVisible(false)} // Close sidebar on overlay click
        ></div>
      )}
    </>
  );
};

export default Sidebar;
