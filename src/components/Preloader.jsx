import React, {useCallback, useRef,useState,useEffect} from "react";
import {motion,useAnimate} from "framer-motion";
import "./Preloader.css";
import background from "./assets/preloadBackground.svg";
import handleArrow from "./assets/handleArrow.svg";
import FadeLoader from "react-spinners/ClipLoader";

export default function({loadDone,getPermission}){
    const [scope,animate] = useAnimate();
    const [draggable,setDraggable] = useState(false);
    useEffect(()=>{
        animate([[scope.current,{webkitBackdropFilter: ["blur(100px)","blur(12.5px)"],
            backdropFilter: ["blur(100px)","blur(12.5px)"]},{duration:3}],
        ["#loader",{opacity:"0"}],
        [scope.current,{height:["100%","50%"]},{duration:2, ease:"backOut"}],
        ["#handle",{opacity:[0,1]}]]).then(
            ()=>{
                setDraggable(true);//enable drag
            }
        );
    },[]);
    const enter = ()=>{
        getPermission().then(()=>{
            animate(scope.current,{height:"0px"},
            {duration:"2",ease:"easeOut"}).then(loadDone);
        });
    }
    return(
        <div className="u-fill u-flex u-flex-justifyCenter u-poster">
            <img src={background}/>
            <motion.div drag="y" dragListener={draggable} dragConstraints={{top:0,bottom:0}}
            dragElastic={0.5} onClick = {enter}
            ref={scope} className="u-absoluteBottom u-fill u-frosted u-flexColumn u-flex-justifyCenter u-flex-alignCenter overlay">
                <div id="loader" className="u-flex u-flex-alignCenter u-regular u-text">
                    <FadeLoader cssOverride={{height:"16px",width:"16px",margin:"8px"}}/>
                    loading...
                </div>
                <div id="handle" className="u-absoluteTop u-flexColumn 
                u-flex-alignCenter u-regular u-title u-hide">
                    <svg width="32" height="56" viewBox="0 0 32 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.99994 39.642L16.1421 53.7841M16.1421 53.7841L30.2842 39.642M16.1421 53.7841L16.1421 -2.85407e-05" 
                            stroke="black" strokeWidth="3" strokeLinecap="square"/>
                    </svg>
                    <div>Tap to enter</div>
                </div>
            </motion.div>
        </div>
    )
}