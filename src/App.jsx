import React, {useCallback, useMemo, useState} from "react";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import VisualWindow from "./components/VisualWindow";
import CTA from "./components/CTA";
import BreathScreen from "./components/BreathScreen";
import Preloader from "./components/Preloader";
import "./App.css";
import { useDeviceOrientation } from './components/useDeviceOrientation';
import {useVolumeLevel, VolumeIndicator} from 'react-volume-indicator';

function App() {
  const { orientation,motion, requestAccess, revokeAccess, error } = useDeviceOrientation();
  const [startRecording, stopRecording, volume] = useVolumeLevel();
  const themeList = ["arrow curtain","dots","arrow matrix","strokes"];
  const [currIndex,setCurrIndex] = useState(0);
  const [loading,setLoading] = useState(true);
  const handleChange = (index)=>{
    setCurrIndex(index);
  }
  const [thumbSwiper, setThumbSwiper] = useState(null);
  const [breathing, setBreathing] = useState(false);
  const handleStartBreathing = ()=>{
    setBreathing(true);
    startRecording();
  }
  const handleEndBreathing = ()=>{
    setBreathing(false);//hello
    stopRecording();
  }
  const handleLoadDone = ()=>{
    setLoading(false);
  }
  return (
    <>{loading?
        <div className="u-absolute u-layerTop u-fill">
          <Preloader loadDone={handleLoadDone} getPermission={requestAccess}/>
        </div>
      :<></>}
      <div className="u-relative viewport">
        <TopBar title={themeList[currIndex]}/>
        <div className="u-absolute u-fill u-layer0 middle-container">
          <div className="u-relative u-fill">
            <VisualWindow thumbRef={thumbSwiper} setIndex={handleChange}/>
            <BreathScreen breathing={breathing} volume={volume} endBreathing={handleEndBreathing}/>
          </div>
        </div>
        {breathing?<></>:<CTA setBreathing={handleStartBreathing}/>}
        <NavBar setThumb={setThumbSwiper} setIndex={handleChange}/>
      </div>
      <div className="spacer u-paper">
      </div>
    </>
  );
}
export default App;



