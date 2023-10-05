import React, {useCallback, useMemo, useState, useRef} from "react";
import "./NavBar.css";
import arrow from "./assets/arrow.svg";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Thumbnails from "./Thumbnails";

export default function(props){
    const y = useMotionValue(0);
    const yInput = [0, -130];
    const arrowRotate = useTransform(y,yInput,[
        "rotate(0deg)",
        "rotate(180deg)"
    ])
    const arrowTop = useTransform(y,yInput,[
        "0px",
        "16px"
    ])
    const themeTop = useTransform(y,yInput,[
        "8px",
        "-24px"
    ])
    const themeOpacity = useTransform(y,yInput,[
        "100%",
        "0%"
    ])
    const indicatorHeight = useTransform(y,yInput,[
        "72px",
        "30px"
    ])
    const thumbnailsHeight = useTransform(y,yInput,[
        "0px",
        "130px"
    ])
    const thumbnailsTop = useTransform(y,yInput,[
        "solid black 0px",
        "solid black 0px"
    ])
    const handleDragEnd=(e,info)=>{
        if(y.current < -65){
            y.set(-130);
        }
        if(y.current > -65){
            y.set(0);
        }
    }
    return (
    <div className="u-absolute NavBar-container u-flexColumn u-layer3">
        <motion.div className="u-flexColumn u-flex-alignCenter 
        u-flex-justifyCenter indicator-container u-paper" 
        drag="y"
        style={{y,height:indicatorHeight}}
        dragConstraints={{ top: -130, bottom: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        >
            <motion.img src={arrow} style={{position:"relative",transform:arrowRotate,top:arrowTop}}/>
            <motion.div className="u-relative u-bold u-title" 
            style={{top:themeTop,opacity:themeOpacity}}>
                Themes
            </motion.div>
        </motion.div>
        <motion.div className="u-absolute"
        style={{width:"100%",height:thumbnailsHeight,borderTop:thumbnailsTop}}>
            <Thumbnails setThumb={props.setThumb}/>
        </motion.div>
    </div>
    )
}
