import "./ProgressBar.css";

function ProgressBar({

currentTime,

duration,

audioRef,

setCurrentTime

}){

const format=(time)=>{

if(isNaN(time)) return "0:00";

const m=Math.floor(time/60);

const s=Math.floor(time%60);

return `${m}:${s.toString().padStart(2,"0")}`;

}

return(

<div className="progress">

<input

type="range"

min="0"

max={duration}

value={currentTime}

onChange={(e)=>{

audioRef.current.currentTime=e.target.value;

setCurrentTime(e.target.value);

}}

/>

<div className="time">

<span>

{format(currentTime)}

</span>

<span>

{format(duration)}

</span>

</div>

</div>

);

}

export default ProgressBar;