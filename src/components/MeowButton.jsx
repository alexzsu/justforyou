import { useRef, useState, useEffect } from "react";
import "./MeowButton.css";

const MEOW_SOUNDS = [
  "/songs/meow1.mp3",
];

function MeowButton({ isPlaying }) {

  const audioRef = useRef(new Audio());
  const [isWiggling, setIsWiggling] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  // Stop any meow immediately once music starts playing
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  const handleClick = () => {
    if (isPlaying) return; // don't allow meows while music is playing

    const random = MEOW_SOUNDS[Math.floor(Math.random() * MEOW_SOUNDS.length)];

    audioRef.current.pause();
    audioRef.current.src = random;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});

    setIsWiggling(false);
    requestAnimationFrame(() => setIsWiggling(true));

    setBurstKey(prev => prev + 1);
  };

  return (
    <button
      className={`meowButton ${isWiggling ? "wiggle" : ""} ${isPlaying ? "disabled" : ""}`}
      onClick={handleClick}
      onAnimationEnd={() => setIsWiggling(false)}
      aria-label="Meow button"
      aria-disabled={isPlaying}
    >
      🐱

      {burstKey > 0 && (
        <span key={burstKey} className="pawBurst">
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i * 72 * Math.PI) / 180;
            const tx = Math.cos(angle) * 36;
            const ty = Math.sin(angle) * 36;
            return (
              <span
                key={i}
                className="burstPaw"
                style={{
                  "--tx": `${tx}px`,
                  "--ty": `${ty}px`,
                  animationDelay: `${i * 0.03}s`
                }}
              >
                🐾
              </span>
            );
          })}
        </span>
      )}
    </button>
  );
}

export default MeowButton;