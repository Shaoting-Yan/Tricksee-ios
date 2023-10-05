import React, {useCallback, useRef,useState,useEffect} from "react";
import startVector from "./assets/startVector.svg";
import "./StartPage.css"


export default function(){
    return(
        <div className="u-relative StartPage-container">
            <div className="u-absolute startVector">
                <img src={startVector}/>
            </div>
            <div className="u-bold u-h1">
                Breath <br/> Session
            </div>
            <div className="u-regular u-title">
                relax and have fun
            </div>
        </div>
    )
}
