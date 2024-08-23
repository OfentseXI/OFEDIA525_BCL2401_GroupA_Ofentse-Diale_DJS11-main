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

      <div
        className={`w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:transform-none lg:relative lg:translate-x-0 lg:w-[25%] lg:flex`}
      >
        <div className="bg-[#121212] h-[100%] rounded flex flex-col justify-around items-start">
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
          <div
            className="flex items-center gap-3 pl-8 cursor-pointer"
            onClick={() => handleNavigation("/favorites")}
          >
            <img className="w-6" src={assets.stack_icon} alt="Home" />
            <p className="font-bold">Favorites</p>
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
