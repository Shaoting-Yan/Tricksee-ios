import React, {useCallback, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Thumbs,FreeMode,Navigation} from 'swiper/modules';
import 'swiper/css';
import './Thumbnails.css';
import arrowCurtain from './assets/arrow-curtain.png';
import dots from './assets/dots.png';
import arrows from './assets/arrows.png';
import strokes from './assets/strokes.png';

export default (props)=>{
    return (
        <div className="Thumbnails-container u-poster">
        <Swiper
            slidesPerView={4}
            className="Thumbnails-swiper"
            watchSlidesProgress={true}
            modules={[FreeMode,Thumbs]}
            onSwiper={props.setThumb}
        >
            <SwiperSlide>
                <img src={arrowCurtain}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={dots}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={arrows}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={strokes}/>
            </SwiperSlide>
            <SwiperSlide className="u-regular u-text u-flexColumn
            u-flex-justifyCenter u-textCenter">
                comming soon
            </SwiperSlide>
        </Swiper>
        </div>
    )
}