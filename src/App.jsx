import "./App.css";
import { useState, useRef, useEffect } from "react";
import playlist from "./data/playlist";

import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward
} from "react-icons/fa";

function App() {

  const [currentSong, setCurrentSong] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showSmilePopup, setShowSmilePopup] = useState(false);
  const [showSecretSong, setShowSecretSong] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());

  useEffect(() => {

    const audio = audioRef.current;

    audio.src = currentSong.audio;

    if(isPlaying){

      audio.play();

    }

  },[currentSong]);

  useEffect(()=>{

    const audio = audioRef.current;

    const updateTime=()=>{

      setCurrentTime(audio.currentTime);

    }

    const loaded=()=>{

      setDuration(audio.duration);

    }

    audio.addEventListener("timeupdate",updateTime);

    audio.addEventListener("loadedmetadata",loaded);

    return()=>{

      audio.removeEventListener("timeupdate",updateTime);

      audio.removeEventListener("loadedmetadata",loaded);

    }

  },[]);

  const playPause=()=>{

    const audio=audioRef.current;

    if(isPlaying){

      audio.pause();

    }else{

      audio.play();

    }

    setIsPlaying(!isPlaying);

  }

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

  useEffect(() => {

    const audio = audioRef.current;

    const handleEnded = () => {

        const currentIndex = playlist.findIndex(
            song => song.id === currentSong.id
        );

        // If you're only using 3 songs
        if (currentIndex === playlist.length - 1) {
            setIsPlaying(false);
            setShowPopup(true);
            return;
        }

        nextSong();

    };

    audio.addEventListener("ended", handleEnded);

    return () => {
        audio.removeEventListener("ended", handleEnded);
    };

}, [currentSong]);

  const formatTime=(time)=>{

    if(isNaN(time)) return "0:00";

    const min=Math.floor(time/60);

    const sec=Math.floor(time%60);

    return `${min}:${sec.toString().padStart(2,"0")}`;

  }

  return(

<div className="app">

<div className="phone">

<div className="header">

<h1>for you</h1>

<p>made especially for you.</p>

</div>

<div className="album">

<img

src={currentSong.cover}

alt=""

className={isPlaying ? "spin" : ""}

/>

</div>

<div className="songInfo">

<h2>{currentSong.title}</h2>

<p>{currentSong.artist}</p>

</div>

<div className="progress">

<input

type="range"

min="0"

max={duration}

value={currentTime}

onChange={(e)=>{

audioRef.current.currentTime=e.target.value;

setCurrentTime(e.target.value);

}}

/>

<div className="time">

<span>{formatTime(currentTime)}</span>

<span>{formatTime(duration)}</span>

</div>

</div>

<div className="controls">

<button onClick={previousSong}>

<FaStepBackward/>

</button>

<button

className="play"

onClick={playPause}

>

{

isPlaying

?

<FaPause/>

:

<FaPlay/>

}

</button>

<button onClick={nextSong}>

<FaStepForward/>

</button>

</div>

<div className="queue">

    <h3>Coming Up</h3>

    {playlist
        .filter(song => song.id !== currentSong.id)
        .map(song => (

            <div
                className="queueItem"
                key={song.id}
                onClick={() => {
                    setCurrentSong(song);
                    setIsPlaying(true);
                }}
            >

                <img
                    src={song.cover}
                    alt={song.title}
                />

                <div>
                    <strong>{song.title}</strong>
                    <p>{song.artist}</p>
                </div>

            </div>

        ))}

</div>

</div> {/* phone */}

{/* First Popup */}
{showPopup && (

<div className="popupOverlay">

    <div className="popup">

        <h2>that's all...</h2>

        <p>
            would you like me to add
            <br />
            one more song?
        </p>

        <div className="popupButtons">

            <button
                onClick={() => setShowPopup(false)}
            >
                No
            </button>

            <button
                onClick={() => {
                    setShowPopup(false);
                    setShowSmilePopup(true);
                }}
            >
                Yes
            </button>

        </div>

    </div>

</div>

)}

{/* Second Popup */}
{showSmilePopup && (

<div className="popupOverlay">

    <div className="popup">

        <h2>hehe...</h2>

        <p>
            but first...
            <br /><br />

            smile first.
            <br /><br />

            you're way too cute
            <br />
            not to smile.
        </p>

        <button
            className="singleButton"
            onClick={() => {

                setShowSmilePopup(false);

                // If you have a hidden fourth song
                if (playlist.length > 3) {
                    setCurrentSong(playlist[3]);
                    setIsPlaying(true);
                }

            }}
        >
            I smiled 😊
        </button>

    </div>

</div>

)}

</div> 

);

}

export default App;