import React, {useState, useRef} from "react";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import VisualWindow from "./components/VisualWindow";
import CTA from "./components/CTA";
import BreathScreen from "./components/BreathScreen";
import Preloader from "./components/Preloader";
import "./App.css";
import {useAnimate} from "framer-motion";
import {useDeviceOrientation } from './components/useDeviceOrientation';
import {useVolumeLevel, VolumeIndicator} from 'react-volume-indicator';
import ReactGA from 'react-ga4';

function App() {
  const { orientation,motion, requestAccess, revokeAccess, error } = useDeviceOrientation();
  const [startRecording, stopRecording, volume] = useVolumeLevel();
  const themeList = ["arrow curtain","dots","arrow matrix","strokes"];
  const [currIndex,setCurrIndex] = useState(0);
  const [loading,setLoading] = useState(true);
  const [choosing,setChoosing] = useState(false);
  
  const TRACKING_ID = "G-K853SF4HV7"; // OUR_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);

  const handleChange = (index)=>{
    setCurrIndex(index);
  }

  const [thumbSwiper, setThumbSwiper] = useState(null);
  const [breathing, setBreathing] = useState(false);

  const handleStartBreathing = ()=>{
    setBreathing(true);
    startRecording();
    console.log("start breathing");
  }
  const handleEndBreathing = ()=>{
    setBreathing(false);//hello
    stopRecording();
  }
  const handleLoadDone = ()=>{
    setLoading(false);
  }
  const handleClick = ()=>{
    ReactGA.event({
      category: 'Interaction',
      action: 'All'
    });
    console.log("sent");
  }
  return (
    <>{loading?
        <div className="u-absolute u-layerTop u-fill">
          <Preloader loadDone={handleLoadDone} getPermission={requestAccess}/>
        </div>
      :<></>}
      <div className="u-relative viewport" onClick={handleClick}>
        <TopBar title={themeList[currIndex]}/>
        <div className="u-absolute u-fill u-layer0 middle-container">
          <div className="u-relative u-fill">
            <VisualWindow thumbRef={thumbSwiper} setIndex={handleChange}/>
            <BreathScreen breathing={breathing} volume={volume} endBreathing={handleEndBreathing}/>
          </div>
        </div>
        {breathing||choosing?<></>:<CTA setBreathing={handleStartBreathing}/>}
        <NavBar setThumb={setThumbSwiper} setIndex={handleChange} 
        setChoose={setChoosing}/>
      </div>
      <div className="spacer u-paper">
      </div>
    </>
  );
}
export default App;



