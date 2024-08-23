import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Navbar from './Navbar';

const SeriesDetail = () => {
  // Extract the id parameter from the URL
  const { id } = useParams();
  
  // State variables
  const [podcast, setPodcast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [likedEpisodes, setLikedEpisodes] = useState(() => {
    // Initialize liked episodes from localStorage
    return JSON.parse(localStorage.getItem('likedEpisodes')) || [];
  });
  const [seasonEpisodesCount, setSeasonEpisodesCount] = useState([]);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        setIsLoading(true);
        // Fetch podcast data from the API
        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPodcast(data);
        console.log('Podcast Data:', data);

        // Calculate episode counts for each season
        const episodeCounts = data.seasons.map(season => season.episodes.length);
        setSeasonEpisodesCount(episodeCounts);

      } catch (error) {
        console.error('Error fetching podcast:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcast();
  }, [id]);

  // Handle season change in dropdown
  const handleSeasonChange = (event) => {
    setSelectedSeason(Number(event.target.value));
  };

  // Handle liking/unliking an episode
  const handleLikeEpisode = (episode, index) => {
    setLikedEpisodes((prevLikedEpisodes) => {
      const episodeWithId = {
        ...episode,
        id: `${id}-${selectedSeason}-${index}`,
        podcastId: id,
        season: selectedSeason + 1
      };
      
      const isLiked = prevLikedEpisodes.some(ep => ep.id === episodeWithId.id);
      const updatedLikedEpisodes = isLiked
        ? prevLikedEpisodes.filter(ep => ep.id !== episodeWithId.id)
        : [...prevLikedEpisodes, episodeWithId];
      
      localStorage.setItem('likedEpisodes', JSON.stringify(updatedLikedEpisodes));
      return updatedLikedEpisodes;
    });
  };

  // Update localStorage when likedEpisodes changes
  useEffect(() => {
    localStorage.setItem('likedEpisodes', JSON.stringify(likedEpisodes));
  }, [likedEpisodes]);

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show message if no podcast data is found
  if (!podcast) {
    return <div>No podcast found.</div>;
  }

  // Render the podcast details
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <h1 className="text-4xl font-bold my-6 text-gray-400">{podcast.title}</h1>
      
      {/* Podcast image and description */}
      <div className="flex flex-col md:flex-row mb-8">
        <img src={podcast.image} alt="Podcast cover" className="h-48 w-48 md:h-64 md:w-64 object-cover mr-0 md:mr-8 mb-4 md:mb-0 rounded-lg border border-gray-300" />
        <div className="flex-1">
          <p className="mb-6 text-gray-300">{podcast.description}</p>
          {/* Display genres if available */}
          {podcast.genres && podcast.genres.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white">Genres:</h3>
              <div className="text-gray-300">
                {podcast.genres.filter(genre => genre.toLowerCase() !== 'all').join(', ')}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Season selection dropdown */}
      {podcast.seasons && podcast.seasons.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Seasons: {podcast.seasons.length}</h3>
          <div className="flex items-center">
            <select
              value={selectedSeason}
              onChange={handleSeasonChange}
              className="border border-gray-300 rounded p-2"
            >
              {podcast.seasons.map((season, index) => (
                <option key={index} value={index}>
                  Season {index + 1}
                </option>
              ))}
            </select>
            <span className="ml-4 text-gray-300">
              Episodes: {seasonEpisodesCount[selectedSeason]}
            </span>
          </div>
        </div>
      )}

      {/* Episode list */}
      {podcast.seasons && podcast.seasons.length > 0 && (
        <div>
          <ul className="space-y-4">
            {podcast.seasons[selectedSeason].episodes.map((episode, index) => (
              <li key={`${id}-${selectedSeason}-${index}`} className="bg-white text-black p-4 rounded-lg shadow-lg flex justify-between items-center transition-shadow duration-200 hover:shadow-xl">
                <div className="flex flex-col flex-grow mr-4">
                  <div className="font-bold text-gray-900">{episode.title}</div>
                  <p className="text-gray-700 mb-2">{episode.description}</p>
                  <audio controls src={episode.file} className="w-full"></audio>
                </div>
                {/* Like/Unlike button */}
                <button
                  onClick={() => handleLikeEpisode(episode, index)}
                  className="ml-4 p-2"
                >
                  {likedEpisodes.some(ep => ep.id === `${id}-${selectedSeason}-${index}`) ? (
                    <AiFillHeart className="text-red-600 text-2xl" />
                  ) : (
                    <AiOutlineHeart className="text-gray-600 text-2xl" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SeriesDetail;