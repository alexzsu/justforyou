import "./Queue.css";

function Queue({
  playlist,
  currentSong,
  setCurrentSong,
  secretUnlocked
}) {

  // Hide secret songs until unlocked
  const visibleSongs = playlist.filter(song => {

    if (song.secret && !secretUnlocked) {
      return false;
    }

    return true;

  });

  return (

    <div className="queue">

      <h3>Playlist</h3>

      {visibleSongs.map(song => (

        <div
          key={song.id}
          className={`queueItem ${
            currentSong.id === song.id
              ? "active"
              : ""
          }`}
          onClick={() => setCurrentSong(song)}
        >

          <img
            src={song.cover}
            alt={song.title}
          />

          <div className="queueText">

            <strong>{song.title}</strong>

            <p>{song.artist}</p>

          </div>

        </div>

      ))}

    </div>

  );

}

export default Queue;