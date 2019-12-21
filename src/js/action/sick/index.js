'use strict'

import {createCircle, createFadeText} from 'action/sick/circle'
import {removeWrapperChild} from 'element'
// import {resultDisplay} from 'action/sick/result'
// import {DNAAnimation} from './three/DNAAnimation'
//--------------------------------------------------------------------------
// 病気の解析を受け取りアニメーションを再生する
//--------------------------------------------------------------------------
export const animationPlayback = datas => {
    // const animation = await new DNAAnimation();
    // if(animation) {
    //     document.body.appendChild(animation.Dom);
    //     // アニメーションを再生する
    //     animation.animate();
    // }

    createFadeText();
    const fade_text = document.querySelector('#text-fade');
    fade_text.addEventListener("animationend", e => {
        removeWrapperChild();
        createCircle(datas);
    });
}


