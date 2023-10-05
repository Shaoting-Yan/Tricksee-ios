import React, {useCallback, useRef,useState,useEffect} from "react";
import {motion,useAnimate} from "framer-motion";
import "./Preloader.css";
import background from "./assets/preloadBackground.svg";
import handleArrow from "./assets/handleArrow.svg";
import FadeLoader from "react-spinners/ClipLoader";

export default function({loadDone}){
    const [scope,animate] = useAnimate();
    const [draggable,setDraggable] = useState(false);
    useEffect(()=>{
        animate([[scope.current,{webkitBackdropFilter: ["blur(100px)","blur(12.5px)"],
            backdropFilter: ["blur(100px)","blur(12.5px)"]},{duration:5}],
        ["#loader",{opacity:"0"}],
        [scope.current,{height:["100%","50%"]},{duration:2, ease:"backOut"}],
        ["#handle",{opacity:[0,1]}]]).then(
            ()=>{
                setDraggable(true);//enable drag
            }
        );
    },[]);
    const enter = ()=>{
        animate(scope.current,{height:"0px"}).then(()=>{
            loadDone();
        });//drag down and end loading
    }
    return(
        <div className="u-fill u-flex u-flex-justifyCenter u-poster">
            <img src={background}/>
            <motion.div drag="y" dragListener={draggable} dragConstraints={{top:0,bottom:300}}
            dragElastic={0.1} onDragEnd = {enter}
            ref={scope} className="u-absoluteBottom u-fill u-frosted u-flexColumn u-flex-justifyCenter u-flex-alignCenter overlay">
                <div id="loader" className="u-flex u-flex-alignCenter u-regular u-text">
                    <FadeLoader cssOverride={{height:"16px",width:"16px",margin:"8px"}}/>
                    loading...
                </div>
                <div id="handle" className="u-absoluteTop u-flexColumn u-regular u-hide">
                    <img src={handleArrow}/>
                    <h3>Enter</h3>
                </div>
            </motion.div>
        </div>
    )
}