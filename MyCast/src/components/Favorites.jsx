import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { AiOutlineClose } from "react-icons/ai";

const Favorites = () => {
  const [favoritePodcasts, setFavoritePodcasts] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const allPodcasts = JSON.parse(localStorage.getItem("allPodcasts")) || [];
    const savedLikedEpisodes = JSON.parse(localStorage.getItem("likedEpisodes")) || [];

    const favoritePodcasts = allPodcasts.filter((podcast) =>
      savedFavorites.includes(podcast.id)
    );
    setFavoritePodcasts(favoritePodcasts);
    setFavoriteEpisodes(savedLikedEpisodes);
  }, []);

  const handlePodcastClick = (id) => {
    navigate(`/series/${id}`);
  };

  const handleRemovePodcast = (id) => {
    const updatedFavorites = favoritePodcasts.filter((podcast) => podcast.id !== id);
    setFavoritePodcasts(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites.map((podcast) => podcast.id)));
  };

  const handleRemoveEpisode = (id) => {
    const updatedLikedEpisodes = favoriteEpisodes.filter((episode) => episode.id !== id);
    setFavoriteEpisodes(updatedLikedEpisodes);
    localStorage.setItem("likedEpisodes", JSON.stringify(updatedLikedEpisodes));
  };

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    localStorage.removeItem("likedEpisodes");
    setFavoritePodcasts([]);
    setFavoriteEpisodes([]);
  };

  const handleSort = (order) => {
    const sortByTitle = (a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    };

    const sortedPodcasts = [...favoritePodcasts].sort(sortByTitle);
    const sortedEpisodes = [...favoriteEpisodes].sort(sortByTitle);

    setFavoritePodcasts(sortedPodcasts);
    setFavoriteEpisodes(sortedEpisodes);
  };

  return (
    <div className="p-4 w-full">
      <Navbar onSort={handleSort} />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {favoritePodcasts.length > 0 ? (
          favoritePodcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white text-black rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer relative group hover:scale-105 transition-transform duration-300"
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
              <button
                onClick={(e) => {e.stopPropagation(); handleRemovePodcast(podcast.id);}}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-red-600 hover:bg-red-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
          ))
        ) : (
          <p>No favorite podcasts found.</p>
        )}
      </div>

      <div className="flex justify-between items-center my-4">
        <h2 className="text-2xl font-bold">My Favorite Episodes</h2>
        {favoriteEpisodes.length > 0 && (
          <button
            onClick={clearFavorites}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Clear Favorites
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteEpisodes.length > 0 ? (
          favoriteEpisodes.map((episode) => (
            <div
              key={episode.id}
              className="bg-white text-black rounded-lg shadow-md p-4 relative group"
            >
              <h3 className="text-lg font-bold">{episode.title}</h3>
              <p className="text-sm text-gray-700 mb-2">
                {episode.description}
              </p>
              <audio controls src={episode.file} className="w-full"></audio>
              <p className="text-xs text-gray-500 mt-2">
                Season {episode.season}, Podcast ID: {episode.podcastId}
              </p>
              <button
                onClick={() => handleRemoveEpisode(episode.id)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-red-600 hover:bg-red-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
          ))
        ) : (
          <p>No favorite episodes found.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
