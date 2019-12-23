'use strict'

import {createCircle, createFadeText} from 'action/sick/circle'
import {removeSpecificChild} from 'element'
import DNAAnimation from '../../three/DNAAnimation'
// import {resultDisplay} from 'action/sick/result'

//--------------------------------------------------------------------------
// 病気の解析を受け取りアニメーションを再生する
//--------------------------------------------------------------------------
export const animationPlayback = datas => {

    const dom = document.getElementById('main');

    // DNA animation
    let animation = new DNAAnimation(dom);
    createFadeText();
    const fade_text = document.querySelector('.text-fade');
    fade_text.addEventListener("animationend", e => {
        removeSpecificChild('child');
        createCircle(datas,animation);
    });
    // animation = null;
}


