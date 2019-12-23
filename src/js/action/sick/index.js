'use strict'

import {createCircle} from 'action/sick/circle'
import {removeSpecificChild, wrapperStyleToggle} from 'element'
import {createFadeText} from 'action/sick/fade-text'

//--------------------------------------------------------------------------
// 病気の解析を受け取りアニメーションを再生する
//--------------------------------------------------------------------------
export const animationPlayback = datas => {
    // add wrapper class
    const class_wrapper = ['circle_wrapper', 'wrapper_back'];
    wrapperStyleToggle(class_wrapper);

    createFadeText('ナノマシンを注入しました');

    const fade_text = document.querySelector('.text-fade');
    fade_text.addEventListener("animationend", e => {
        // remove child element
        removeSpecificChild('child');

        createFadeText('DNA解析を開始します');

        const fade_text = document.querySelector('.text-fade');
        fade_text.addEventListener("animationend", e => {
            // remove child element
            removeSpecificChild('child');

            createCircle(datas);
        });
    });
}


