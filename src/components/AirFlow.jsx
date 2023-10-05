import React, {useCallback, useRef,useState,useEffect} from "react";
import { motion, useAnimate } from "framer-motion";
import "./AirFlow.css";

export default function({angle}){
    return (
        <div style={{transform:`rotate(${angle}deg)`}} className="u-absolute AirFlow">
            <motion.svg width="210" height="185" viewBox="0 0 210 185" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <motion.path animate={{pathLength:[0,1]}} transition={{repeat:Infinity,duration:3}}
                    d="M0 92.9736L164 92.9736C187.999 92.9736 198.499 80.5004 198.499 70.5004C198.499 60.5004 193.499 48.0004 175.999 48.0004C161.999 48.0004 155.499 61.0004 155.499 68.0004" stroke="black" strokeWidth="22.5"/>
                    <motion.path animate={{pathLength:[0,1]}} transition={{repeat:Infinity,duration:3}}
                    d="M0 56.8928C29.7396 56.8928 85.5529 56.9733 94.7421 56.9733C118.741 56.9733 129.241 44.5 129.241 34.5C129.241 24.5 124.241 12 106.741 12C92.7409 12 86.2409 25 86.2409 32" stroke="black" strokeWidth="22.5"/>
                    <motion.path animate={{pathLength:[0,1]}} transition={{repeat:Infinity,duration:3}}
                    d="M0 128.527C29.7396 128.527 85.5528 128.527 94.742 128.527C118.741 128.527 129.241 141 129.241 151C129.241 161 124.241 173.5 106.741 173.5C92.7408 173.5 86.2408 160.5 86.2408 153.5" stroke="black" strokeWidth="22.5"/>
                </g>
            </motion.svg>           
        </div>
    )
}