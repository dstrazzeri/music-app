import React, {useState, useRef, useEffect} from 'react'
import Controls from './Controls';
import Details from './Details';
import Slider from '../slider/Slider';

function Player(props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [percentage, setPercentage] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    const audioEl = useRef(null);

    const onChange = (e) => {
        const audio = audioEl.current
        audio.currentTime = (audio.duration / 100) * e.target.value
        setPercentage(e.target.value)
      }

    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });

    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }

    const getCurrDuration = (e) => {
        const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
        const time = e.currentTarget.currentTime
    
        setPercentage(+percent)
        setCurrentTime(time.toFixed(2))
    }

    return (
        <div className="c-player">
            <audio src={props.songs[props.currentSongIndex].src} ref={audioEl} onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2))}}></audio>
            <h4>Playing now</h4>
            <Details song={props.songs[props.currentSongIndex]} />
            <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} duration={duration}
        currentTime={currentTime}/>
            <Slider percentage={percentage} onChange={onChange} />
            <p>Next up: <span>{props.songs[props.nextSongIndex].title} by {props.songs[props.nextSongIndex].artist}</span></p>
        </div>
    )
}


export default Player;