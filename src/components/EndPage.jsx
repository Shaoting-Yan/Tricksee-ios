import React, {useCallback, useRef,useState,useEffect} from "react";
import face from "./assets/face.svg";
import tags from "./assets/tags.svg";
import "./EndPage.css"


export default function({handleExit}){
    return(
        <div className="u-relative EndPage-container">
            <img src={face} className="u-absolute face"/>
            <div className="u-bold u-h3">
                I am enough. <br/> I did enough.<br/> I can let go.
            </div>
            <div className="u-regular u-text">
                here are some tags for you!
            </div>
            <img src={tags} className="tags"/>
            <div className="u-regular u-text u-relative u-textCenter exitButton u-flexColumn u-flex-justifyCenter"
                onClick={handleExit}>
                exit session
            </div>
        </div>
    )
}
