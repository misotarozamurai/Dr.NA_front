'use strict'

import {createElement, escapeHtml, wrapperStyleToggle, removeSpecificChild} from 'element'
import {resultDisplay} from 'action/sick/result'
import DNAAnimation from '../../three/DNAAnimation';
import { isFunction } from 'util';
import {createFadeText} from 'action/sick/fade-text'

const divWrapper = document.getElementById('wrapper');
const classWrapper = ['circle_wrapper', 'wrapper_back'];

//--------------------------------------------------------------------------
// プログレスバー作成前のアニメーションを作成
//--------------------------------------------------------------------------
// export const createFadeText = () => {
//     wrapperStyleToggle(classWrapper);

//     const fade_text = createElement('p', false, ['text-fade']);
//     fade_text.id = 'child';
//     fade_text.textContent = escapeHtml('DNA解析を開始します');

//     divWrapper.appendChild(fade_text);
// }

//--------------------------------------------------------------------------
// プログレスバーの作成
//--------------------------------------------------------------------------
// ----- Create a progress bar -----
let aryMessage = null;
export const createCircle = (datas, animation) => {
    aryMessage = datas;
    // Create an element
    const circle = createElement('div', false, ['circle']);
    circle.id = 'child';
    const circle_inner = createElement('div', false, ['circle_inner']);
    circle_inner.textContent = escapeHtml('DNA解析中');
    const cup = createElement('p', true, ['cup']);

    // Create parent-child relationship
    circle_inner.appendChild(cup);
    circle.appendChild(circle_inner);
    divWrapper.appendChild(circle);

    startTimer(animation);
}
//--------------------------------------------------------------------------
// プログレスバーの数値カウントアップを行う
//--------------------------------------------------------------------------
// ----- Increase the count from 0 to 100 -----
const startTimer = (animation) => {
    let num = 0;        // initial
    const tgt = 125;    // upper limit
    const speed = 80;   // speed
    const cup = document.getElementById('cup');

    setInterval(() => {
        if(num <= tgt) {
            // Display up to 100%
            if(num <= 100) {
                cup.textContent = escapeHtml(num + '%');
                // Change style when you reach 100%
                if(num === 100) cup.classList.add('cup_complete');
            } 
            num ++;
            if(num === tgt) stopTimer(animation);
        }
    }, speed);
}

// ----- Remove the progress bar and display the result message -----
const stopTimer = (animation) => {
    clearInterval(startTimer);
    // remove child element
    removeSpecificChild('child');

    createFadeText('DNA解析完了');

    const fade_text = document.querySelector('.text-fade');
    fade_text.addEventListener("animationend", e => {
        // new Three
        removeSpecificChild('child');
        createFadeText('治療を開始します');
        const fade_text = document.querySelector('.text-fade');
        fade_text.addEventListener("animationend", e => {
            // remove child element
            removeSpecificChild('child');
            wrapperStyleToggle(classWrapper);
            resultDisplay(aryMessage);
        });
    });
}