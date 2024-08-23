import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Favorites = () => {
  const [favoritePodcasts, setFavoritePodcasts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const allPodcasts = JSON.parse(localStorage.getItem("allPodcasts")) || [];

    // Filter podcasts that are in the favorites
    const favoritePodcasts = allPodcasts.filter((podcast) =>
      savedFavorites.includes(podcast.id)
    );
    setFavoritePodcasts(favoritePodcasts);
  }, []);

  const handlePodcastClick = (id) => {
    navigate(`/series/${id}`); // Navigate to the SeriesDetail page with the podcast id
  };

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavoritePodcasts([]); // Clear the state as well
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

  return (
    <div className="p-4 w-full">
      <Navbar onSort={handleSort}/>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-2xl font-bold">My Favorite Podcasts</h2>
        {favoritePodcasts.length > 0 && (
          <button
            onClick={clearFavorites}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Clear Favorites
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m">
        {favoritePodcasts.length > 0 ? (
          favoritePodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white text-black rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handlePodcastClick(podcast.id)}
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
            </div>
            
          ))
        ) : (
          <p>No favorite podcasts found.</p>
        )}
      </div>
      <div className="flex justify-between items-center my-4">
      <h2 className="text-2xl font-bold">My Favorite Episodes</h2>
        {favoritePodcasts.length > 0 && (
          <button
            onClick={clearFavorites}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Clear Favorites
          </button>
        )}
      </div>
    </div>
    
  );
};

export default Favorites;
