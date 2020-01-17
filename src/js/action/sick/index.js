'use strict'

import {createCircle} from 'action/sick/circle'
import {removeSpecificChild, wrapperStyleToggle} from 'element'
import {createFadeText} from 'action/sick/fade-text'
import DNAAnimation from '../../three/DNAAnimation'
import {messageSend} from 'socket'

//--------------------------------------------------------------------------
// 病気の解析を受け取りアニメーションを再生する
//--------------------------------------------------------------------------
export const animationPlayback = datas => {

    const dom = document.getElementById('main');

    // DNA animation
    let animation = new DNAAnimation(dom);
    // add wrapper class
    const class_wrapper = ['circle_wrapper', 'wrapper_back'];
    wrapperStyleToggle(class_wrapper);

    createFadeText('ナノマシンを注入しました');
    messageSend('message', 'Nano machine injected.');

    const fade_text = document.querySelector('.text-fade');
    fade_text.addEventListener("animationend", e => {
        // remove child element
        removeSpecificChild('child');

        createFadeText('DNA解析を開始します');
        messageSend('message', 'Start DNA analysis.');

        const fade_text = document.querySelector('.text-fade');
        fade_text.addEventListener("animationend", e => {
            // remove child element
            removeSpecificChild('child');
            createCircle(datas,animation);
        });
    });
}


