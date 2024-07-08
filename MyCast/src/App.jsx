import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import AudioPlayer from './components/AudioPlayer'
import Display from './components/Display'
import { AudioPlayerContext } from './context/AudioPlayerContext'

const App = () => {

  const {audioRef,track} = useContext(AudioPlayerContext)

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display />
      </div>
      <AudioPlayer />
      <audio ref={audioRef} src={track.file} preload='auto'></audio>
    </div>
  )
}

export default App
