import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToPodcasts = () => {
    navigate("/podcasts");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <img src="/public/myCast.png" alt="Podcast Logo" className="h-60 w-60" />
      <h1 className="text-4xl font-bold text-white mb-4">
        Welcome to the MyCast Podcast App
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Listen to Anything, Anywhere, Anytime!
      </p>
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
