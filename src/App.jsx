import "./App.css";

import { useState, useRef, useEffect } from "react";

import playlist from "./data/playlist";

import Header from "./components/Header";
import AlbumPlayer from "./components/AlbumPlayer";
import ProgressBar from "./components/ProgressBar";
import PlayerControls from "./components/PlayerControls";
import Queue from "./components/Queue";
import Popup from "./components/Popup";
import Ending from "./components/Ending";

function App() {

  const [currentSong, setCurrentSong] = useState(playlist[0]);

  const [showPopup,setShowPopup]=useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [showSmilePopup, setShowSmilePopup] = useState(false);


  const [isPlaying,setIsPlaying]=useState(false);

  const [currentTime,setCurrentTime]=useState(0);

  const [duration,setDuration]=useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const audioRef=useRef(new Audio());

  useEffect(() => {

    const audio = audioRef.current;

    audio.pause();

    audio.src = currentSong.audio;

    audio.load();

    if (isPlaying) {

        audio.play().catch(() => {});

    }

}, [currentSong, isPlaying]);

    useEffect(() => {

  const audio = audioRef.current;

  const handleEnded = () => {


    if(currentSong.id===9){

        setIsPlaying(false);

        setShowPopup(true);

        return;

    }

    if (currentSong.id === 10) {

    setIsPlaying(false);

    setShowEnding(true);

    setTimeout(() => {

        setShowEnding(false);

        setSecretUnlocked(false);

        setShowPopup(false);

        setCurrentSong(playlist[0]);

        audioRef.current.pause();

        audioRef.current.currentTime = 0;

        setCurrentTime(0);

        setIsPlaying(false);

    }, 5000);

    return;

}

    nextSong();

};

  audio.addEventListener(
    "ended",
    handleEnded
  );

  return () => {

    audio.removeEventListener(
      "ended",
      handleEnded
    );

  };

}, [currentSong]);

useEffect(()=>{

const audio=audioRef.current;

const update=()=>{

setCurrentTime(audio.currentTime);

}

const loaded=()=>{

setDuration(audio.duration);

}

audio.addEventListener("timeupdate",update);

audio.addEventListener("loadedmetadata",loaded);

return()=>{

audio.removeEventListener("timeupdate",update);

audio.removeEventListener("loadedmetadata",loaded);

}

},[]);

const playPause = async () => {

    const audio = audioRef.current;

    if (isPlaying) {

        audio.pause();

        setIsPlaying(false);

    } else {

        try {

            await audio.play();

            setIsPlaying(true);

        } catch (err) {

            console.log(err);

        }

    }

};

const nextSong=()=>{

const index=playlist.findIndex(

s=>s.id===currentSong.id

);

const next=(index+1)%playlist.length;

setCurrentSong(playlist[next]);

}

const previousSong=()=>{

const index=playlist.findIndex(

s=>s.id===currentSong.id

);

const prev=(index-1+playlist.length)%playlist.length;

setCurrentSong(playlist[prev]);

}

  return (

<div
className="app"
style={{

background:`

linear-gradient(
180deg,

${currentSong.theme},

#ffffff

)

`

}}
>

      <div className="particles">

{

Array.from({

length:12

}).map((_,i)=>(

<span

key={i}

/>

))

}

</div>

      <div className="phone">

        <Header />

        <AlbumPlayer

        currentSong={currentSong}

        isPlaying={isPlaying}

        />

        <ProgressBar

        currentTime={currentTime}

        duration={duration}

        audioRef={audioRef}

        setCurrentTime={setCurrentTime}

        />

        <PlayerControls

        isPlaying={isPlaying}

        playPause={playPause}

        nextSong={nextSong}

        previousSong={previousSong}

        />

        <Queue
          playlist={playlist}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />

      </div>

    <Popup
    showPopup={showPopup}
    setShowPopup={setShowPopup}
    onUnlock={() => {

        setSecretUnlocked(true);

        setCurrentSong(playlist[3]);

        setIsPlaying(true);

    }}
/>


<Ending showEnding={showEnding} />

    </div>

  );

}

export default App;