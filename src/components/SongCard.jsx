function SongCard({ song, selected, onSelect }) {
  return (
    <div
      className={`song ${selected ? "selected" : ""}`}
      onClick={() => onSelect(song)}
    >
      <img src={song.cover} alt={song.title} />

      <div>
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>
    </div>
  );
}

export default SongCard;