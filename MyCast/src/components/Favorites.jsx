import React, { useEffect, useState } from "react";

const Favorites = () => {
  const [favoritePodcasts, setFavoritePodcasts] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const allPodcasts = JSON.parse(localStorage.getItem("allPodcasts")) || [];

    // Filter podcasts that are in the favorites
    const favoritePodcasts = allPodcasts.filter((podcast) =>
      savedFavorites.includes(podcast.id)
    );
    setFavoritePodcasts(favoritePodcasts);
  }, []);

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavoritePodcasts([]); // Clear the state as well
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoritePodcasts.length > 0 ? (
          favoritePodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white text-black rounded-lg shadow-md p-4 flex flex-col items-center"
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
    </div>
  );
};

export default Favorites;
