import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AlbumItem = ({ name, desc, id, image }) => {
  const { id: routeId } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [album, setAlbum] = useState({});


  useEffect(() => {
    console.log(`Fetching data for ID: ${series}`);
    fetch(`https://podcast-api.netlify.app/series`)
     .then(response => response.json())
     .then(data => {
        console.log(`API response:`, data);
        setAlbum(data);
        setSeries(data.series);
        setLoading(false);
      })
     .catch(err => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, [id]);

    const handleClick = () => {
    navigate(`/season/${propId}/episodes`);
    };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const todayDate = new Date().toLocaleDateString();

  return (
    <div className="p-4 w-full text-white">
      <img src={image} alt={name} className="w-45 h-80 rounded-md mb-2" />
      <h2 className="text-2xl font-bold mb-4">{name}</h2>
      <p className="text-lg mb-4">{desc}</p>
    </div>
  );
};

export default AlbumItem;