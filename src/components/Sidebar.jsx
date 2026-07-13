import { FaSpotify } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <FaSpotify size={38} />
        <h2>My Playlist</h2>
      </div>

      <ul>
        <li className="active">Home</li>
        <li>Playlist</li>
        <li>About</li>
      </ul>
    </aside>
  );
}

export default Sidebar;