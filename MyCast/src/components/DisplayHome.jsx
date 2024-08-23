import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";

const DisplayHome = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.series && Array.isArray(data.series)) {
          const sortedSeries = data.series.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          setSeries(sortedSeries.slice(0, 4)); // Take only the 4 most recent series
        } else {
          console.error("Series data is not available or not an array");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Casts</h1>
        <div className="flex overflow-auto">
          {series.map((item, index) => (
            <AlbumItem key={index} name={item.title} desc={item.description} id={item.id} image={item.image} />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
            <SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
