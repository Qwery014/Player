import React, { useEffect, useRef, useState } from 'react';
import "../styles/Player.scss";
import q from "../assets/music/Don't Stop Me Now/Queen - Don't Stop Me Now (Official Video).mp3";
import qImg from "../assets/music/Don't Stop Me Now/27ca78589c387bdc552e46281ba71bd2.jpg";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { trackList } from './consts';


const Player = () => {
  const [play, setPlay] = useState(false);
  const [timeline, setTimeline] = useState("0");
  const [percent, setPercent] = useState(0);
  const [step, setStep] = useState(null);
  const [queue, setQueue] = useState(0);
  const [curr, setCurr] = useState(null);

  useEffect(() => {
    setCurr(trackList[queue]);
  }, [queue, trackList]);

  function changeQueue(i) {
    if (i > trackList.length - 1) {
      setQueue(0);
      console.log(i)
    } else if (i < 0) {
      setQueue(trackList.length - 1);
      console.log(trackList.length - 1);
    } else {
      setQueue(i)
      console.log(i)
    }
    setTimeout(() => {
      setPlay(!play);
    }, 1000);
  }


  const [duration, setDuration] = useState({
    durMin: 0,
    durSec: 0
  });

  const audio = useRef(null);

  function changeSeek(e) {
    audio.current.currentTime = e.target.value;
    setTimeline(e.target.value);
    setPercent(e.target.value / (audio.current.duration / 100));
  }



  useEffect(() => {
    if (audio.current) {
      play ? audio.current.play() : audio.current.pause();
    }
  }, [play, audio.current]);

  useEffect(() => {
    const currentAudio = audio.current;
    if (currentAudio) {
      const handleLoadedMetadata = () => {
        setDuration({
          durMin: Math.floor(currentAudio.duration / 60),
          durSec: Math.floor(currentAudio.duration % 60) > 9
            ? Math.floor(currentAudio.duration % 60)
            : `0${Math.floor(currentAudio.currentTime % 60)}`,
        });
        setStep(100 / currentAudio.duration);
      };

      currentAudio.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        currentAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [audio.current, curr]);


  return (
    <div className='player'>
      <div className="player__container">
        <div className="player__wrapper">
          {
            curr && curr.cover && curr.name && curr.author && curr.music ? (
              <>
                <div className="player__img" style={{ backgroundImage: `url(${curr.cover})` }}></div>
                <div className="player__info">
                  <div className="player__info_name">
                    {curr.name}
                  </div>
                  <div className="player__info_author">
                    {curr.author}
                  </div>
                  <div className="player__info_controls">
                    <button
                      className="player__info_controls-item control-prev"
                      onClick={() => changeQueue(queue - 1)}
                    >
                      <TbPlayerSkipForwardFilled />
                    </button>
                    {
                      play ? (
                        <button className="player__info_controls-item control-pause" onClick={() => setPlay(!play)}>
                          <FaPause />
                        </button>
                      ) : (
                        <button className="player__info_controls-item control-play" onClick={() => setPlay(!play)}>
                          <FaPlay />
                        </button>
                      )
                    }
                    <button
                      className="player__info_controls-item control-next"
                      onClick={() => changeQueue(queue + 1)}
                    >
                      <TbPlayerSkipForwardFilled />
                    </button>
                  </div>
                  <div className="player__info_timeline">
                    <div className="player__info_timeline-duration">
                      <div className="duration">
                        {audio.current ? Math.floor(audio.current.currentTime / 60) : 0}:{audio.current ? Math.floor(audio.current.currentTime % 60) > 9 ? Math.floor(audio.current.currentTime % 60) : `0${Math.floor(audio.current.currentTime % 60)}` : 0}
                      </div>
                      <div className="duration">
                        {duration.durMin}:{duration.durSec}
                      </div>
                    </div>
                    <input
                      type="range"
                      onInput={(e) => changeSeek(e)}
                      value={timeline}
                      style={{ backgroundSize: `${percent}% 100%` }}
                      max={audio.current ? audio.current.duration : 100}
                      min={0}
                      step={step}
                    />
                    <audio
                      controls
                      src={curr.music}
                      ref={audio}
                      onEnded={() => { changeQueue(queue + 1); setPlay(!play) }}
                      canplaythrough
                      onTimeUpdate={(e) => {
                        setTimeline(e.target.currentTime);
                        setPercent((e.target.currentTime / e.target.duration) * 100);
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              null
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Player;