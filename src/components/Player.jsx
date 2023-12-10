import React, { useEffect, useRef, useState } from 'react';
import "../styles/Player.scss";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { switchTrack } from "../store/style/styleSlice";
import { trackList } from './consts';
import { isColorDark } from '../helpers/func';


const Player = () => {
  const trackId = useSelector((state) => state.style.trackId);
  const dispatch = useDispatch();

  const [play, setPlay] = useState(false);
  const [timeline, setTimeline] = useState("0");
  const [percent, setPercent] = useState(0);
  const [step, setStep] = useState(null);
  const [curr, setCurr] = useState(null);
  const [isFirst, setIsFirst] = useState(0);

  useEffect(() => {
    setCurr(trackList[trackId]);
  }, [trackId, trackList]);

  function changeQueue(i) {
    if (i > trackList.length - 1) {
      setPlay(false);
      dispatch(switchTrack(0));
      console.log(i)
    } else if (i < 0) {
      setPlay(false);
      dispatch(switchTrack(trackList.length - 1));
      console.log(trackList.length - 1);
    } else {
      setPlay(false);
      dispatch(switchTrack(i));
      console.log(i)
    }
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
  }, [play]);

  function pauseFunc() {
    setPlay(false);
    console.log("pause");
  }
  function playFunc() {
    setPlay(true);
    console.log("play");
  }

  function onLoaded(currentAudio) {
    setDuration({
      durMin: Math.floor(currentAudio.duration / 60),
      durSec: Math.floor(currentAudio.duration % 60) > 9
        ? Math.floor(currentAudio.duration % 60)
        : `0${Math.floor(currentAudio.currentTime % 60)}`,
    });
    setStep(100 / currentAudio.duration);

    if (isFirst) {
      setTimeout(() => {
        setPlay(true);
      }, 1000);
      console.log(play)
    } else {
      setIsFirst(1);
    }
  }

  return (
    <div className='player'>
      <div
        className="player__background"
        style={{
          backgroundColor: curr ? curr.mainColor : "#000",
        }}
      >
        <div className={`balls-wrapper ${play ? "balls-wrapper-anim" : ""}`}>
          <div
            className="ball-1"
            style={{
              width: play ? "20vw" : 0,
              height: play ? "20vw" : 0
            }}
          ></div>
          <div
            className="ball-2"
            style={{
              width: play ? "20vw" : 0,
              height: play ? "20vw" : 0
            }}
          ></div>
          <div
            className="ball-3"
            style={{
              width: play ? "20vw" : 0,
              height: play ? "20vw" : 0
            }}
          ></div>
        </div>
      </div>
      <div className="player__container"
        style={{ color: curr ? isColorDark(curr.mainColor) ? ("#ffffff") : ("#000000") : "", }}>
        <div
          className="player__container_background"
          style={{
            backgroundColor: curr ? isColorDark(curr.mainColor) ? ("#ffffff50") : ("#00000050") : "",
          }}
        ></div>
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
                      onClick={() => changeQueue(trackId - 1)}
                    >
                      <TbPlayerSkipForwardFilled />
                    </button>
                    {
                      play ? (
                        <button
                          className="player__info_controls-item control-pause"
                          onClick={pauseFunc}
                        >
                          <FaPause />
                        </button>
                      ) : (
                        <button
                          className="player__info_controls-item control-play"
                          onClick={playFunc}
                        >
                          <FaPlay />
                        </button>
                      )
                    }
                    <button
                      className="player__info_controls-item control-next"
                      onClick={() => changeQueue(trackId + 1)}
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
                      onEnded={() => { changeQueue(trackId + 1); setPlay(!play) }}
                      onTimeUpdate={(e) => {
                        setTimeline(e.target.currentTime);
                        setPercent((e.target.currentTime / e.target.duration) * 100);
                      }}
                      onLoadedMetadata={e => onLoaded(e.target)}
                      onPause={pauseFunc}
                      onPlay={playFunc}
                      onDurationChange={() => console.log("changed")}
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