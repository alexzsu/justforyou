import { useState, useEffect } from "react";
import "./Popup.css";

function Popup({
  showPopup,
  setShowPopup,
  onUnlock
}) {

  const [step, setStep] = useState(1);

  // Reset the popup every time it opens
  useEffect(() => {
    if (showPopup) {
      setStep(1);
    }
  }, [showPopup]);

  if (!showPopup) return null;

  return (

    <div className="popupOverlay">

      <div className="popup">

        {step === 1 ? (

          <>
            <h2>that's everything i prepared.</h2>

            <p>
              would you like me to add
              <br />
              one more song?
            </p>

            <div className="popupButtons">

              <button
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                maybe next time
              </button>

              <button
                onClick={() => {
                  setStep(2);
                }}
              >
                yes
              </button>

            </div>
          </>

        ) : (

          <>
            <h2>one condition...</h2>

            <p>
              smile first.
              <br /><br />
              you're way too cute
              <br />
              not to smile.
            </p>

            <button
              className="singleButton"
              onClick={() => {

                setShowPopup(false);

                onUnlock();

              }}
            >
              I smiled 😊
            </button>

          </>

        )}

      </div>

    </div>

  );

}

export default Popup;