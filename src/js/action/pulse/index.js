'use strict'

import {createElement, escapeHtml} from 'element'
import {ecgDrawing} from 'action/pulse/pulse'

//--------------------------------------------------------------------------
// 脈データを受け取り心電図を作成します
//--------------------------------------------------------------------------
// ----- Create a display element and draw an ECG -----
export const createPulse = (pulses, height) => {
    // Creating an element
    const wrpper = createElement('div', false, ['pulse_wrapper']);
    // ECG drawing element
    const canvas = createElement('canvas', true, ['pulse-canvas']);
    canvas.width = 300;
    canvas.height = 80;
    // Creating a height element
    const p_height = createElement('p', false, ['height']);
    p_height.textContent = escapeHtml('height : ' + height + 'cm');
    // Creating AVG elements and creating icons
    const avg = createElement('p', false, ['avg']);
    avg.textContent = escapeHtml('AVG : ' + pulses.avg);
    const item = createElement('span', false, ['item']);
    const heart = createElement('i', false, ['heart', 'fas', 'fa-heart']);

    // Formatting AVG elements
    item.appendChild(heart);
    avg.insertBefore(item, avg.firstChild);

    // Formatting entire elements
    wrpper.appendChild(canvas);
    wrpper.appendChild(p_height);
    wrpper.appendChild(avg);
    const main_wrpper = document.getElementById('wrapper');
    main_wrpper.appendChild(wrpper);

    // Draw an electrocardiogram
    ecgDrawing(pulses.datas);
}