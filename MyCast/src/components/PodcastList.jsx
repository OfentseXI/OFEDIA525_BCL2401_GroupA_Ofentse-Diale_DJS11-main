import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from localStorage on initial render
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const handleSeriesClick = (id) => {
    navigate(`/series/${id}`);
  };

  const handleSort = (order) => {
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setPodcasts(sortedPodcasts);
  };

  const handleFavoriteClick = (podcast) => {
    const updatedFavorites = favorites.includes(podcast.id)
      ? favorites.filter((id) => id !== podcast.id)
      : [...favorites, podcast.id];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-4 w-full">
      <Navbar onSort={handleSort} />
      <h2 className="text-2xl font-bold my-4">Featured Casts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white text-black rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handleSeriesClick(podcast.id)}
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-bold text-center">{podcast.title}</h3>
              <p className="text-sm text-gray-700 text-center">
                Last updated: {new Date(podcast.updated).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-700 text-center">
                Seasons: {podcast.seasons}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking the button
                  handleFavoriteClick(podcast);
                }}
                className="text-2xl mt-2"
              >
                <FaHeart
                  className={
                    favorites.includes(podcast.id)
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PodcastList;
