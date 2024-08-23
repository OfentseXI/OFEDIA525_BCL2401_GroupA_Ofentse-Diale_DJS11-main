import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PodcastList from './PodcastList'; 
import Favorites from './Favorites';
import SeriesDetail from './SeriesDetail'; 
import Home from './Home';


const Display = () => {
    return (
        <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/podcasts" element={<PodcastList />} />
                <Route path="/favorites" element={<Favorites />} /> 
                <Route path="/series/:id" element={<SeriesDetail />} />
            </Routes>
        </div>
    );
};

export default Display;
