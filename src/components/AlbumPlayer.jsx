import "./AlbumPlayer.css";

function AlbumPlayer({
  currentSong,
  isPlaying
}) {

  return (
    <>
      <div className="album">

        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className={isPlaying ? "spin" : ""}
        />

      </div>

      <div className="songInfo">

        <h2>{currentSong.title}</h2>

        <p>{currentSong.artist}</p>

      </div>
    </>
  );
}

export default AlbumPlayer;