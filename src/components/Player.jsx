import React, { useEffect, useRef, useState } from 'react';
import "../styles/Player.scss";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { TbPlayerSkipForwardFilled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { switchTrack } from "../store/style/styleSlice";
import { trackList } from './consts';


const Player = () => {
  const trackId = useSelector((state) => state.style.trackId);
  const blur = useSelector(state => state.style.blur);
  const theme = useSelector(state => state.style.theme);
  const dispatch = useDispatch();

  const [play, setPlay] = useState(false);
  const [timeline, setTimeline] = useState("0");
  const [percent, setPercent] = useState(0);
  const [step, setStep] = useState(null);
  const [curr, setCurr] = useState(null);
  const [isFirst, setIsFirst] = useState(0);

  const audio = useRef(null);
  const video = useRef(null);

  useEffect(() => {
    setCurr(trackList[trackId]);
    setPlay(false);
    setPercent(0);
  }, [trackId, trackList]);



  function onQueueChange(trackInd) {
    setPlay(false);
    dispatch(switchTrack(trackInd));
    setPercent(0);
    video.current.pause();
  }

  function changeQueue(i) {
    if (i > trackList.length - 1) {
      onQueueChange(0)
    } else if (i < 0) {
      onQueueChange((trackList.length - 1))
    } else {
      onQueueChange((i))
    }
  }

  const [duration, setDuration] = useState({
    durMin: 0,
    durSec: 0
  });

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
    video.current.pause();
  }

  function playFunc() {
    setPlay(true);
    video.current.play();
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
        playFunc();
      }, 500);
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
          filter: `blur(${blur / 15}px)`,
        }}
      >
        <video
          src={theme.background}
          ref={video}
          onLoadedMetadata={(e) => {
            e.target.volume = 0;
            return play ? e.target.play() : null;
          }}
          onEnded={e => { e.target.currentTime = 0; e.target.play() }}
        />
      </div>
      <div className="player__container"
        style={{ color: theme.isDark ? ("#ffffff") : ("#000000") }}>
        <div
          className="player__container_background"
          style={{
            backgroundColor: theme.isDark ? ("#ffffff20") : ("#00000020"),
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