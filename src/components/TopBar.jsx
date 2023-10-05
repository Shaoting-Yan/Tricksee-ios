import React, {useCallback, useMemo, useState } from "react";
import "./TopBar.css";
import menu from "./assets/menu.svg"

export default function(props){
    return (
        <div className="u-absolute u-regular u-text
        u-flex u-flex-justifyCenter u-flex-alignCenter 
        TopBar-container u-paper u-layer3">
            {props.title}
            <button className="u-absolute TopBar-menu">
                <img src={menu}/>
            </button>
        </div>
    )
}