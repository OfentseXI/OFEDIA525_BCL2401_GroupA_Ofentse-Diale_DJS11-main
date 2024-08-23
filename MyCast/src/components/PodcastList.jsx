import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Navbar from "./Navbar";

const PodcastList = () => {
  const [ setGenres] = useState({}); // State for storing genres, but it's currently unused
  const [podcasts, setPodcasts] = useState([]); // State for storing the list of podcasts
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites"); // Retrieve favorites from localStorage
    return savedFavorites ? JSON.parse(savedFavorites) : []; // Parse favorites or return an empty array
  });

  // Fetch podcasts data on component mount
  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok"); // Handle network errors
        }
        return response.json();
      })
      .then((data) => {
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title)); // Sort podcasts alphabetically by title
        setPodcasts(sortedData); // Set sorted podcasts in state
        localStorage.setItem("allPodcasts", JSON.stringify(sortedData)); // Save all podcasts to localStorage
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error); // Set error state if there's an error fetching data
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  // Fetch genres based on genre IDs from the podcasts data
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreIds = [...new Set(podcasts.map((podcast) => podcast.genre_id))]; // Get unique genre IDs from podcasts
        const genreFetchPromises = genreIds.map(async (id) => {
          const response = await fetch(`https://podcast-api.netlify.app/genre/${id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch genre for id ${id}`);
          }
          const data = await response.json();
          return { id, name: data.genre }; // Assuming data.genre contains the genre name
        });
        const fetchedGenres = await Promise.all(genreFetchPromises); // Fetch all genres in parallel
        const genresMap = fetchedGenres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genresMap); // Store genres in state
      } catch (error) {
        console.error('Error fetching genres:', error); // Log errors if fetching genres fails
      }
    };

    fetchGenres();
  }, [podcasts]); // Dependency array includes podcasts to refetch genres when podcasts change

  // List of hardcoded genres
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

  // Function to get genre names based on genre IDs
  const getGenresFromIds = (genreIds) => {
    return genreIds.map(id => {
      const genre = genres.find(genre => genre.id === id);
      return genre ? genre.name : '';
    }).filter(Boolean); // Filter out any empty strings
  };

  const navigate = useNavigate(); // Hook to navigate between routes

  // Handle podcast click to navigate to the SeriesDetail page
  const handlePodcastClick = (id) => {
    navigate(`/series/${id}`); // Navigate to the SeriesDetail page with the podcast id
  };

  // Handle sorting of podcasts based on the order parameter
  const handleSort = (order) => {
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setPodcasts(sortedPodcasts); // Set sorted podcasts in state
  };

  // Handle favorite button click
  const handleFavoriteClick = (podcast) => {
    const updatedFavorites = favorites.includes(podcast.id)
      ? favorites.filter((id) => id !== podcast.id) // Remove from favorites if already favorited
      : [...favorites, podcast.id]; // Add to favorites if not already favorited

    setFavorites(updatedFavorites); // Update favorites in state
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save updated favorites to localStorage
  };

  return (
    <div className="p-4 w-full">
      <Navbar onSort={handleSort} /> {/* Navbar component with sorting functionality */}
      <h2 className="text-2xl font-bold my-4">Featured Podcasts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <div>Loading...</div> // Show loading message while fetching data
        ) : error ? (
          <div>Error: {error.message}</div> // Show error message if there's an error
        ) : (
          podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="bg-white text-black rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => handlePodcastClick(podcast.id)} // Navigate to podcast details on click
            >
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-bold text-center">{podcast.title}</h3>
              <p className="text-sm text-gray-700 text-center">
                Last updated: {new Date(podcast.updated).toLocaleDateString()} {/* Display last updated date */}
              </p>
              <p className="text-sm text-gray-700 text-center">
                Seasons: {podcast.seasons} {/* Display number of seasons */}
              </p>
              <p className="text-sm text-gray-700 text-center">
                Genre: {getGenresFromIds(podcast.genres).join(', ')} {/* Display podcast genres */}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event from propagating to parent div
                  handleFavoriteClick(podcast); // Handle favorite button click
                }}
                className="text-2xl mt-2"
              >
                <FaHeart
                  className={
                    favorites.includes(podcast.id)
                      ? "text-red-500" // Heart icon is red if podcast is favorited
                      : "text-gray-500" // Heart icon is gray if podcast is not favorited
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
