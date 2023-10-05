import React, {useCallback, useMemo, useState } from "react";
import Looper from "./Looper";
import "./BreathBar.css";

export default function(props){
    return (
        <div className="u-absolute BreathBar-container u-flexColumn u-flex-justifyCenter">
            <Looper speed="4" direction="right">
                <div className="u-regular u-text" style={{paddingLeft:"20px"}}>
                    {props.text}
                </div>
            </Looper>
        </div>
    )
}