'use strict'

import {createElement, wrapperStyleToggle, removeWrapperChild} from 'element'
import {dataFlaw, messageSend} from 'socket'

const divWrapper = document.getElementById('wrapper');
const classWrapper = ['circle_wrapper', 'wrapper_result'];

//--------------------------------------------------------------------------
// 診断結果用のメッセージを整形した後、メッセージを表示する
//--------------------------------------------------------------------------
// ----- When the progress bar is deleted, receive the display data and display it -----
// datas = sick:{name: place: message}
export const resultDisplay = datas => {
    messageSend('message', 'DNA repair completed.');

    // Create message for display
    const messages = messageSplit(datas.message);
    const first_text = 'あなたは将来、' + datas.name + 'に掛かると解析結果として出ました。';
    messages.unshift(first_text);
    messages.push('今回はこの病気に関するDNAを修復しました。','これからも定期的な診断をおすすめします。');
    messages.push('これで診察は以上になります。お疲れ様でした。');

    // Creating a display area
    createMessageBox();
    // Show message
    messageSend('message', 'Dr.NA diagnostic results.');
    messageDisplay(messages);
}

// ----- Splits the message and returns it in an array -----
const messageSplit = messages => {
    const ms_split = [];
    while(true) {
        // Search for punctuation
        const punctuation = messages.indexOf('。');
        let val_split = '';
        // If the punctuation exceeds 35 characters, separate it with the 35th character
        if (34 < punctuation) {
            val_split = messages.substr(0, 35);
            messages = messages.slice(35);
        } else {
            val_split = messages.substr(0, punctuation + 1);
            messages = messages.slice(punctuation + 1);
        }
    
        ms_split.push(val_split);
        if (messages.length === 0) break;
    }
    return ms_split;
}

// ----- Create a box for displaying the message -----
let messageBox = null;
const createMessageBox = () => {
    wrapperStyleToggle(classWrapper);
    messageBox = createElement('div', true, ['message-box']);
    divWrapper.appendChild(messageBox);
}

//--------------------------------------------------------------------------
// メッセージを表示を制御します
//--------------------------------------------------------------------------
// ----- Display a formatted message -----
let txtCount = 0;   // Subscript counter
const messageDisplay = messages => {
    console.log(messages)
    // Create and play a statement
    const uttr = new SpeechSynthesisUtterance(messages[txtCount]);
    speechSynthesis.speak(uttr);

    // Create paragraph and insert text
    const paragraph = createElement('p', false, ['txt_message', 'txt_style']);
    paragraph.textContent = messages[txtCount];
    messageBox.appendChild(paragraph);

    const fade_text = document.querySelector('.txt_message');
    fade_text.addEventListener("animationend", e => {
        paragraph.classList.remove('txt_message');
        txtCount ++;
        (async() => {
            if(txtCount < messages.length) {
                // Reset text after displaying 3 lines
                if(txtCount % 3 === 0) {
                    await removeOverMessage();
                }
                messageDisplay(messages);
                return
            }
            removeReturn();
        })();
    });
}

// ----- Delete text in message box no -----
const removeOverMessage = async() => {
    await sleep(1000);
    while(messageBox.firstChild) {
        messageBox.removeChild(messageBox.firstChild);
    }
}

// ----- Stop processing temporarily -----
const sleep = msec => {
    return new Promise( resolve => {
       setTimeout( () => {resolve()}, msec);
    });
}

// ----- End presentation and return to beginning -----
const removeReturn = async() => {
    await sleep(8000);
    wrapperStyleToggle(classWrapper);
    removeWrapperChild();
    txtCount = 0;
    dataFlaw.flg = true;
    messageSend('Animation END', 'End of diagnosis');
}