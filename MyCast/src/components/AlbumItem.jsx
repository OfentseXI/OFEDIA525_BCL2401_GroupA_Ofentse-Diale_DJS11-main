import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const AlbumItem = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app')
    .then(response => response.json())
    .then(data => setAlbum( data))
    .catch(err => console.log(error))
  }, [])

return (
   <div className="p-4 w-full text-white">
      <h2 className="text-2xl font-bold mb-4">${data.title}</h2>
      <img
        src={series.image}
        alt={series.title}
        className="w-45 h-80 rounded-md mb-2"
      />
      <p className="text-lg mb-4">{series.description}</p>
      <p className="text-sm mb-2">Last updated: {todayDate}</p>
      <p className="text-sm mb-4">Genre: {series.genre}</p>
   

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {series.seasons.map((season) => (
          <div
            key={season.id}
            className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleSeasonClick(season.id)} // Pass season.id to handleSeasonClick
          >
            <img
              src={season.image}
              alt={season.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2 text-black">
                {season.title}
              </h3>
              <p className="text-sm text-gray-700">{season.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
)
  /*fetch().then((data)=>{
    // console.log(data)
    return data.json();
  }).then((completedata)=>{
      //console.log(completedata[2].title);
      let data1="";
     completedata.map((values)=>{
         data1+=
     
     })
 }).catch((error)=>{
    return <div>Error: {error.message}</div>;
 })

 
  /*const handleSeasonClick = (showid) => {
    navigate(`/season/${showid}/episodes`);
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const todayDate = new Date().toLocaleDateString();

  return (
    */
};

export default AlbumItem;
