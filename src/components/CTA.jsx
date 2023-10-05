import React, {useCallback, useMemo, useState } from "react";
import "./CTA.css";
import air from "./assets/air.svg"
import { useAnimate } from "framer-motion"

export default function(props){
    const [scope, animate] = useAnimate();
    return (
        <div className="CTA-container u-paper u-absolute u-layer2
        u-flex u-flex-alignCenter u-flex-justifyCenter"
        onClick={props.setBreathing}>
            <img src={air}/>
        </div>
    )
}