import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./AlbumPlayer.css";

function AlbumPlayer({ currentSong, isPlaying, isLiked, onToggleLike }) {

  const [burstKey, setBurstKey] = useState(0);

  const handleLikeClick = () => {
    onToggleLike();
    if (!isLiked) {
      setBurstKey(prev => prev + 1);
    }
  };

  return (
    <>
      <div className="album">

        <div className={`albumGlow ${isPlaying ? "glowing" : ""}`} />

        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className={isPlaying ? "spin" : ""}
        />

        <button
          className={`heartButton ${isLiked ? "liked" : ""}`}
          onClick={handleLikeClick}
          aria-label={isLiked ? "Unlike song" : "Like song"}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}

          {burstKey > 0 && (
            <span key={burstKey} className="heartBurst">
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i * 60 * Math.PI) / 180;
                const tx = Math.cos(angle) * 42;
                const ty = Math.sin(angle) * 42;
                return (
                  <span
                    key={i}
                    className="burstHeart"
                    style={{
                      "--tx": `${tx}px`,
                      "--ty": `${ty}px`,
                      animationDelay: `${i * 0.03}s`
                    }}
                  >
                    ♥
                  </span>
                );
              })}
            </span>
          )}
        </button>

      </div>

      <div className="songInfo">
        <h2>{currentSong.title}</h2>
        <p>{currentSong.artist}</p>
        {currentSong.note && <p className="songNote">{currentSong.note}</p>}
      </div>
    </>
  );
}

export default AlbumPlayer;