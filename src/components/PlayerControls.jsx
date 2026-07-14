import "./PlayerControls.css";

import {

FaPlay,

FaPause,

FaStepBackward,

FaStepForward

} from "react-icons/fa";

function PlayerControls({

isPlaying,

playPause,

nextSong,

previousSong

}){

return(

<div className="controls">

<button

onClick={previousSong}

>

<FaStepBackward/>

</button>

<button

className="play"

onClick={playPause}

>

{

isPlaying

?

<FaPause/>

:

<FaPlay/>

}

</button>

<button

onClick={nextSong}

>

<FaStepForward/>

</button>

</div>

);

}

export default PlayerControls;