import React, {useState,useEffect} from "react";
import "./BreathScreen.css";
import './VisualWindow.css';
import BreathBar from "./BreathBar";
import StartPage from "./StartPage";
import EndPage from "./EndPage";
import {useTransform,useAnimate,animate,useMotionValue,useMotionValueEvent} from "framer-motion";
import AirFlow from "./AirFlow";
import Face from "./Face";

export default function(props){
    const [text,setText] = useState("Start breath");
    const [breathText,setBreathText] = useState("");

    const [starting,setStarting] = useState(false);
    const [looping,setLooping] = useState(false);
    const [letOut, setLetOut] = useState(false);
    const [ending,setEnding] = useState(false);

    const [scope, animateScope] = useAnimate();
    const [airFlowAngle,setAirFlowAngle] = useState(0);

    const progress = useMotionValue(0); 
    
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    function easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
        }

    useEffect(()=>{
        if(props.breathing){
            setText("Breath session");
            setStarting(true);
            animateScope(scope.current,{height:[null,"100%","100%"]},
                    {ease:"easeInOut",duration:8,times:[0,0.25,1]}).then(()=>{
                        setText("Tap to stop breath");
                        setStarting(false);
                        setLooping(true);
                        animate(progress,[0,14],{duration:14,repeat:Infinity});
                    });
        }else{
            setText("Start breath");
        }
    },[props.breathing]);

    const currHeight=useTransform(progress,[0,8,10,14],[100,20,20,100]);

    useMotionValueEvent(progress, "change", (latest) => {
        animateScope(scope.current,{height:`${currHeight.current}%`});
        if(parseInt(progress.current)==8){//time for hold
            setAirFlowAngle(180);
            setBreathText("Hold");
        }else if(parseInt(progress.current)==0){//time for breath
            setAirFlowAngle(0);
            setBreathText("Breath in");
            setLetOut(false);
        }else if(parseInt(progress.current)==10){//time for letting out
            setBreathText("Let out");
            setTimeout(()=>{setLetOut(true)},250);
        }
      });

    useEffect(()=>{
        let mapped = easeOutQuint(clamp(props.volume,0,10)/10)*50;
        animateScope(scope.current,{webkitBackdropFilter: `blur(${mapped}px)`,
            backdropFilter: `blur(${mapped}px)`})
    },[props.volume]);

    const handleClick = ()=>{
        if(looping){
            setLooping(false);
            setEnding(true);
            setText("");
            progress.stop();
            setText("you are the best");
            animateScope([[scope.current,{height:[null,"100%","100%"]},
                {duration:5, times:[0,0.5,1],ease:"anticipate"}]]);
        }
    }

    const handleExit = ()=>{
        animate(scope.current,{height:"50px"},{duration:2,ease:"anticipate"}).then(
            ()=>{
                setEnding(false);
                props.endBreathing();
            }
        );//reset breath screen
        }

    function choose(){
        if(starting){
            return <StartPage/>;
        }else if(looping){
            return (
                <>
                <div className="breathText">
                    <div className="u-h1 u-bold">
                        {breathText}
                    </div>
                    {
                        letOut?
                        <div className="u-regular u-text u-relative notice">
                        Breathe harder and see <br/> what happens. 
                        </div>:
                        <></>
                    }
                </div>
                <div className="breathAnimate">
                    <AirFlow angle={airFlowAngle}/>
                    <Face/>
                </div>
            </>
            );
        }else if(ending){
            return <EndPage handleExit={handleExit}/>;
        }
    }
    return (    
        <div className="u-layer1 u-absoluteBottom u-frosted BreathScreen-container"
            ref={scope}
            onClick={handleClick}
            >
                    {props.breathing?choose()
                    :<></>}
                <BreathBar text={text}/>
        </div>
    )
} 
