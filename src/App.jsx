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
import SongRequest from "./components/SongRequest";
import MeowButton from "./components/MeowButton";

function App() {

  const [currentSong, setCurrentSong] = useState(playlist[0]);

  const [showPopup, setShowPopup] = useState(false);
  const [showEnding, setShowEnding] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const [likedSongs, setLikedSongs] = useState(new Set());
  const [showRequest, setShowRequest] = useState(false);

  // Smooth background crossfade — two stacked layers, swap opacity on song change
  const [activeLayer, setActiveLayer] = useState(0);
  const [layerColors, setLayerColors] = useState([
    playlist[0].theme,
    playlist[0].theme
  ]);

  const secretSong = playlist.find(song => song.secret);
  const visibleSongs = playlist.filter(song => !song.secret);
  const lastVisibleSong = visibleSongs[visibleSongs.length - 1];

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const nextLayer = activeLayer === 0 ? 1 : 0;

    setLayerColors(prev => {
      const updated = [...prev];
      updated[nextLayer] = currentSong.theme || prev[nextLayer];
      return updated;
    });

    setActiveLayer(nextLayer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;

    audio.pause();
    audio.src = currentSong.audio;
    audio.load();

    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (currentSong.id === lastVisibleSong.id) {
        setIsPlaying(false);
        setShowPopup(true);
        return;
      }

      if (currentSong.secret) {
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
        }, 10000);

        return;
      }

      nextSong();
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  useEffect(() => {
    const audio = audioRef.current;

    const update = () => setCurrentTime(audio.currentTime);
    const loaded = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", loaded);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", loaded);
    };
  }, []);

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

  const nextSong = () => {
    if (currentSong.secret) return;

    const index = visibleSongs.findIndex(song => song.id === currentSong.id);

    if (index === visibleSongs.length - 1) {
      setShowPopup(true);
      setIsPlaying(false);
      return;
    }

    setCurrentSong(visibleSongs[index + 1]);
  };

  const previousSong = () => {
    if (currentSong.secret) {
      setCurrentSong(lastVisibleSong);
      return;
    }

    const index = visibleSongs.findIndex(song => song.id === currentSong.id);

    if (index > 0) {
      setCurrentSong(visibleSongs[index - 1]);
    }
  };

  const toggleLike = () => {
    setLikedSongs(prev => {
      const updated = new Set(prev);
      if (updated.has(currentSong.id)) {
        updated.delete(currentSong.id);
      } else {
        updated.add(currentSong.id);
      }
      return updated;
    });
  };

  return (
    <div className="app">

      <div
        className="bgLayer"
        style={{
          background: `linear-gradient(180deg, ${layerColors[0]}, #fdfbff)`,
          opacity: activeLayer === 0 ? 1 : 0
        }}
      />
      <div
        className="bgLayer"
        style={{
          background: `linear-gradient(180deg, ${layerColors[1]}, #fdfbff)`,
          opacity: activeLayer === 1 ? 1 : 0
        }}
      />

      <div className="lightLeak" />
      <div className="vignette" />
      <div className="filmGrain" />


      <div className="particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

<div className="phoneFloatWrapper">
  <div className="phone">
    <MeowButton isPlaying={isPlaying} />

    <Header />

    <AlbumPlayer
      currentSong={currentSong}
      isPlaying={isPlaying}
      isLiked={likedSongs.has(currentSong.id)}
      onToggleLike={toggleLike}
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
      secretUnlocked={secretUnlocked}
    />

    <button className="requestTrigger" onClick={() => setShowRequest(true)}>
      🎵 request a song
    </button>
  </div>
</div>

      

      <Popup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        onUnlock={() => {
          setSecretUnlocked(true);
          setCurrentSong(secretSong);
          setIsPlaying(true);
        }}
      />

      <Ending showEnding={showEnding} />
      <SongRequest
        showRequest={showRequest}
        setShowRequest={setShowRequest}
      />
    </div>
  );
}

export default App;