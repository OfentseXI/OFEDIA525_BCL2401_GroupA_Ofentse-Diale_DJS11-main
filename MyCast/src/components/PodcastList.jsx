import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";

const PodcastList = () => {
  const [ setGenres] = useState({});
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
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
        localStorage.setItem("allPodcasts", JSON.stringify(sortedData)); // Save all podcasts to localStorage
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreIds = [...new Set(podcasts.map((podcast) => podcast.genre_id))];
        const genreFetchPromises = genreIds.map(async (id) => {
          const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch genre for id ${id}`);
          }
          const data = await response.json();
          return { id, name: data.genre }; // Assuming data.genre contains the genre name
        });
        const fetchedGenres = await Promise.all(genreFetchPromises);
        const genresMap = fetchedGenres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genresMap);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  },);

  const genres = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Personal Growth' },
    { id: 2, name: 'Investigative Journalism' },
    { id: 3, name: 'History' },
    { id: 4, name: 'Comedy' },
    { id: 5, name: 'Entertainment' },
    { id: 6, name: 'Business' },
    { id: 7, name: 'Fiction' },
    { id: 8, name: 'News' },
    { id: 9, name: 'Kids and Family' },
  ];

  const getGenresFromIds = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : '';
    }).filter(Boolean); // Filter out any empty strings
  };

  const navigate = useNavigate();

  const handlePodcastClick = (id) => {
    navigate(`/series/${id}`); // Navigate to the SeriesDetail page with the podcast id
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
      <h2 className="text-2xl font-bold my-4">Featured Podcasts</h2>
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
              <p className="text-sm text-gray-700 text-center">
                Genre: {getGenresFromIds(podcast.genres).join(', ')}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
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
