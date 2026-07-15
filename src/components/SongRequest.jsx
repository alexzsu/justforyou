import { useState } from "react";
import { FaPaperPlane, FaMusic } from "react-icons/fa";
import "./SongRequest.css";

// Replace with your own Formspree endpoint — see setup notes below
const FORM_ENDPOINT = "https://formspree.io/f/mojgvbjw";

function SongRequest({ showRequest, setShowRequest }) {

  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  if (!showRequest) return null;

  const handleClose = () => {
    setShowRequest(false);
    setStatus("idle");
    setSongTitle("");
    setArtist("");
    setNote("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songTitle.trim()) return;

    setStatus("sending");

    try {
      const formData = new FormData();
      formData.append("song", songTitle);
      formData.append("artist", artist);
      formData.append("note", note);

      await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });
    } catch (err) {
      console.log(err);
    }

    setStatus("sent");

    setTimeout(handleClose, 2800);
  };

  return (
    <div className="requestOverlay">
      <div className="requestCard">

        {status === "sent" ? (
          <div className="requestSent">
            <span className="sentIcon">💌</span>
            <h2>sent, with love.</h2>
            <p>
              thank you for sharing this with me.
              <br />
              i'll add it soon 🎶
            </p>
          </div>
        ) : (
          <>
            <button className="closeBtn" onClick={handleClose} aria-label="Close">
              ×
            </button>

            <div className="requestHeaderIcon">
              <FaMusic />
            </div>

            <h2>got a song in mind?</h2>

            <p className="requestSub">
              tell me what you'd love to hear next,
              <br />
              and I'll add it to our playlist.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="song title *"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="artist (optional)"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />

              <textarea
                placeholder="why this song? 🥹 (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />

              <button type="submit" className="sendBtn" disabled={status === "sending"}>
                {status === "sending" ? "sending..." : (
                  <>send <FaPaperPlane /></>
                )}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default SongRequest;