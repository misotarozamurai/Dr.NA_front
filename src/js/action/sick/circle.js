'use strict'

import {createElement, escapeHtml, wrapperStyleToggle, removeSpecificChild} from 'element'
import {resultDisplay} from 'action/sick/result'
import {createFadeText} from 'action/sick/fade-text'
import {messageSend} from 'socket'

const divWrapper = document.getElementById('wrapper');
const classWrapper = ['circle_wrapper', 'wrapper_back'];

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

    messageSend('message', 'During DNA analysis.');

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
                cup.textContent = num;
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
    messageSend('message', 'DNA analysis completed.');

    const fade_text = document.querySelector('.text-fade');
    fade_text.addEventListener("animationend", e => {
        // DNAAnimation setup
        animation.setup();
        removeSpecificChild('child');

        createFadeText('治療を開始します');
        messageSend('message', 'Start treatment.');

        const fade_text = document.querySelector('.text-fade');
        fade_text.addEventListener("animationend", e => {
            animation.dom.addEventListener('DNAisComplete',() => setTimeout(() => resultDisplay(aryMessage),3000));
            animation.start();
            // remove child element
            removeSpecificChild('child');
            wrapperStyleToggle(classWrapper);
        });
    });
}