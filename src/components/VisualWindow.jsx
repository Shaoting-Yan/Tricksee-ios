import React, {useCallback, useMemo, useEffect, useState, useRef} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation,Thumbs } from 'swiper/modules';
import 'swiper/css';
import './VisualWindow.css';
import ArrowCurtain from "../sketches/ArrowCurtain";
import Dots from "../sketches/Dots";
import ArrowMatrix from "../sketches/ArrowMatrix";
import Strokes from "../sketches/Strokes";

export default function(props){
    return(
        <Swiper
            slidesPerView={1}
            className="VisualWindow-swiper u-layer0"
            thumbs={{swiper:props.thumbRef}}
            modules={[FreeMode, Thumbs]} 
            onActiveIndexChange={(swiper)=>{props.setIndex(swiper.activeIndex)}}
        >
            <SwiperSlide className="u-poster">
                <ArrowCurtain/>
            </SwiperSlide>
            <SwiperSlide className="u-poster">
                <Dots/>
            </SwiperSlide>
            <SwiperSlide className="u-poster">
                <ArrowMatrix/>
            </SwiperSlide>
            <SwiperSlide className="u-poster">
                <Strokes/>
            </SwiperSlide>
        </Swiper>

    )
}