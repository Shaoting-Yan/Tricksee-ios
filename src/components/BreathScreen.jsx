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
            setText("Tap to stop breath");
            setStarting(true);
            animateScope(scope.current,{height:[null,"100%","100%"]},
                    {ease:"easeInOut",duration:8,times:[0,0.25,1]}).then(()=>{
                        setStarting(false);
                        setLooping(true);
                        animate(progress,[0,19],{duration:19,repeat:Infinity});
                    });
        }else{
            setText("Start breath");
        }
    },[props.breathing]);

    const currHeight=useTransform(progress,[0,4,11,19],[100,15,15,100]);

    useMotionValueEvent(progress, "change", () => {
        animateScope(scope.current,{height:`${currHeight.current}%`},{ease:"easeInOut"});
        if(parseInt(progress.current)==4){
            setAirFlowAngle(180);
            setBreathText("Hold");
        }else if(parseInt(progress.current)==0){
            setAirFlowAngle(0);
            setBreathText("Breath in");
        }else if(parseInt(progress.current)==11){
            setBreathText("Let out");
        }
      });


    useEffect(()=>{
        let mapped = easeOutQuint(clamp(props.volume,0,10)/10)*100;
        animateScope(scope.current,{webkitBackdropFilter: `blur(${mapped}px)`,
            backdropFilter: `blur(${mapped}px)`})
    },[props.volume]);

    const handleClick = ()=>{
        if(looping){
            setLooping(false);
            setEnding(true);
            progress.stop();
            console.log(progress.current);
            animateScope([[scope.current,{height:[null,"100%","100%"]},
            {duration:6, times:[0,0.5,1],ease:"easeOut"}],
            [scope.current,{height:["100%","10%"]},{duration:2,ease:"easeInOut"}]]).then(()=>{
                animate(scope.current,{height:"50px"});//reset breath screen
                setEnding(false);
                props.endBreathing();
            });
        }
    }
    function choose(){
        if(starting){
            return <StartPage/>;
        }else if(looping){
            return (
                <>
                <div className="breathText u-h1 u-bold">
                    {breathText}
                </div>
                <div className="breathAnimate">
                    <AirFlow angle={airFlowAngle}/>
                    <Face/>
                </div>
            </>
            );
        }else if(ending){
            return <EndPage/>;
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
