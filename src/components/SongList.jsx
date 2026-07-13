import SongCard from "./SongCard";

function SongList({ songs, currentSong, onSelect }) {
  return (
    <div className="playlist">
      {songs.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          selected={currentSong?.id === song.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default SongList;