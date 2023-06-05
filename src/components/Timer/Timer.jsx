import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from '../PlayButton/PlayButton';
import PauseButton from '../PauseButton/PauseButton';
import SettingsButton from '../SettingsButton/SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from '../SettingsContext/SettingsContext';

const red = '#D75665';
const green = '#3AAB3F';

function Timer() {

  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current = secondsLeftRef.current - 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {

  function switchMode() {
    const nextMode = modeRef.current === 'work' ? 'break' : 'work';
    const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

    setMode(nextMode);
    modeRef.current = nextMode;

    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  secondsLeftRef.current = settingsInfo.workMinutes * 60;
  setSecondsLeft(secondsLeftRef.current);

  const interval = setInterval(() => {
    if (isPausedRef.current) {
      return;
    }
    if (secondsLeftRef.current === 0) {
      switchMode();
    }

    tick();
  },1000);

  return () => clearInterval(interval);
}, [settingsInfo]);

  const totalSecods = mode === 'work' 
    ? settingsInfo.workMinutes * 60 
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSecods) * 100;

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if(seconds < 10) seconds = '0' +seconds;

  return (
    <div>
      <CircularProgressbar 
      value={percentage} 
      text={minutes + ':' + seconds} 
      styles={buildStyles({
        textColor: '#F1E4D1',
        pathColor: mode === 'work' ? red : green,
        tailColor: 'rgba(255,255,255,.2)',
      })} />
      <div style={{marginTop:'20px'}}>
        {isPaused
        ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
        : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
      </div>
      <div style={{marginTop:'20px'}}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;