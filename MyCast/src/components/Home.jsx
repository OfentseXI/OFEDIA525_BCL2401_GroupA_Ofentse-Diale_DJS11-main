import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Function to navigate to the Podcasts page
  const goToPodcasts = () => {
    navigate("/podcasts"); // Navigate to the /podcasts route
  };

  return (
    // Main container with flexbox to center content vertically and horizontally
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* Podcast logo */}
      <img src="/public/myCast.png" alt="Podcast Logo" className="h-60 w-60" />

      {/* Main heading */}
      <h1 className="text-4xl font-bold text-white mb-4">
        Welcome to the MyCast Podcast App
      </h1>

      {/* Subheading with description */}
      <p className="text-lg text-gray-300 mb-8">
        Listen to Anything, Anywhere, Anytime!
      </p>

      {/* Button to navigate to the Podcasts page */}
      <button
        onClick={goToPodcasts}
        className="bg-violet-950 text-violet-300 py-2 px-4 rounded font-bold transition hover:scale-105"
      >
        Go to Podcasts
      </button>
    </div>
  );
};

export default Home;
