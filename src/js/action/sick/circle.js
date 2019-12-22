'use strict'

import {createElement, wrapperStyleToggle, removeSpecificChild} from 'element'
import {resultDisplay} from 'action/sick/result'

const divWrapper = document.getElementById('wrapper');
const classWrapper = ['circle_wrapper', 'wrapper_back'];

//--------------------------------------------------------------------------
// プログレスバー作成前のアニメーションを作成
//--------------------------------------------------------------------------
export const createFadeText = () => {
    wrapperStyleToggle(classWrapper);

    const fade_text = createElement('p', false, ['text-fade']);
    fade_text.id = 'child';
    fade_text.textContent = 'DNA解析を開始します';

    divWrapper.appendChild(fade_text);
}

//--------------------------------------------------------------------------
// プログレスバーの作成
//--------------------------------------------------------------------------
// ----- Create a progress bar -----
let aryMessage = null;
export const createCircle = (datas) => {
    aryMessage = datas;
    // Create an element
    const circle = createElement('div', false, ['circle']);
    circle.id = 'child';
    const circle_inner = createElement('div', false, ['circle_inner']);
    circle_inner.textContent = 'DNA解析中';
    const cup = createElement('p', true, ['cup']);

    // Create parent-child relationship
    circle_inner.appendChild(cup);
    circle.appendChild(circle_inner);
    divWrapper.appendChild(circle);

    startTimer();
}

//--------------------------------------------------------------------------
// プログレスバーの数値カウントアップを行う
//--------------------------------------------------------------------------
// ----- Increase the count from 0 to 100 -----
const startTimer = () => {
    let num = 0;        // initial
    const tgt = 125;    // upper limit
    const speed = 80;   // speed
    const cup = document.getElementById('cup');

    setInterval(() => {
        if(num <= tgt) {
            // Display up to 100%
            if(num <= 100) {
                cup.textContent = num + '%';
                // Change style when you reach 100%
                if(num === 100) cup.classList.add('cup_complete');
            } 
            num ++;
            if(num === tgt) stopTimer();
        }
    }, speed);
}

// ----- Remove the progress bar and display the result message -----
const stopTimer = () => {
    clearInterval(startTimer);
    removeSpecificChild('child');
    wrapperStyleToggle(classWrapper);
    resultDisplay(aryMessage);
}