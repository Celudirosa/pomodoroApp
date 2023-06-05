import Slider from 'rc-slider';
import './slider.scss';
import SettingsContext from '../components/SettingsContext/SettingsContext';
import { useContext } from 'react';
import BackButton from '../components/BackButton/BackButton';

function Settings() {
  
  const settingsInfo = useContext(SettingsContext);

  return (
    <div style={{textAlign:'left'}}>
      <label>work: {settingsInfo.workMinutes}:00</label>
      <Slider 
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break: {settingsInfo.breakMinutes}:00</label>
      <Slider 
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={60}
      />
      <div style={{textAlign:'center', marginTop:'20px'}}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
      </div>
    </div>
  );
}

export default Settings;