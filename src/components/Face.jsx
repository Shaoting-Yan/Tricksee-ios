import React, {useCallback, useRef,useState,useEffect} from "react";
import { motion, useAnimate ,useMotionValue, animate} from "framer-motion";
import './Face.css';

export default function(){
    return (
        <motion.svg className="u-absolute faceFixed" transform={{}}
        xmlns="http://www.w3.org/2000/svg" width="247" height="758" viewBox="0 0 247 758" fill="none">
            <path d="M246.82 744.599C216.603 744.599 151.14 744.599 131.029 744.599C105.89 744.599 81.5134 734.696 69.3248 704.987C57.1363 675.277 99.2378 666.5 99.2378 632.5C99.2378 598.5 60.9452 591.5 62.4688 591.5C63.9924 591.5 119.738 576 119.738 548.5C119.738 521 68.5631 508.419 55.6127 502.832C57.8981 502.832 79.353 501.213 88.3694 497.5C101.32 492.168 106.652 478.727 106.652 469.586C106.652 460.444 109.699 449.779 86.8459 449.779C68.5631 449.779 31.9975 451.303 16 452.065C33.521 369.538 75.7238 177.375 76.9427 172.5V0" 
            stroke="black" stroke-opacity="1" stroke-width="25"/>
        </motion.svg>
    )
}