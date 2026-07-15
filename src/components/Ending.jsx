import "./Ending.css";

function Ending({ showEnding }) {

  if (!showEnding) return null;

  return (
    <div className="endingOverlay">

      <div className="petals">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className={`petal petal-${(i % 4) + 1}`} />
        ))}
      </div>

      <div className="endingCard">

        <h2>one last thing...</h2>

        <p>
          thank you for listening.
          <br /><br />

          i wasn't really sure how to say everything,
          so i hoped these songs could say a little
          of it for me.
          <br /><br />

          i hope they made you smile.
          <br /><br />

          take care of yourself.
          <br /><br />

          <span className="endingHeart">♡</span>
        </p>

      </div>

    </div>
  );

}

export default Ending;