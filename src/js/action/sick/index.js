'use strict'

import {createCircle, createFadeText} from 'action/sick/circle'
import {removeWrapperChild} from 'element'
import DNAAnimation from '../../three/DNAAnimation'
// import {resultDisplay} from 'action/sick/result'
//--------------------------------------------------------------------------
// 病気の解析を受け取りアニメーションを再生する
//--------------------------------------------------------------------------
export const animationPlayback = datas => {

    const dom = document.getElementById('wrapper');

    // DNA animation
    const animation = new DNAAnimation(dom);
    animation.animate();
    createFadeText();
    const fade_text = document.querySelector('#text-fade');
    fade_text.addEventListener("animationend", e => {
        removeWrapperChild();
        createCircle(datas,animation);
    });
    
    
}


