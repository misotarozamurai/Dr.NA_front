'use strict'

import {createElement, escapeHtml} from 'element'

//--------------------------------------------------------------------------
// テキストのアニメーションを作成
//--------------------------------------------------------------------------
export const createFadeText = message => {
    const wrapper = document.getElementById('wrapper');
    const fade_text = createElement('p', false, ['text-fade']);
    fade_text.id = escapeHtml('child');
    fade_text.textContent = escapeHtml(message);

    wrapper.appendChild(fade_text);
}