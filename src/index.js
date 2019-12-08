'use strict'

import 'reset_style.css'
import 'style.css'
import 'core-js'
import 'regenerator-runtime/runtime'
import {Signaling} from 'signaling'

const webSock = new Signaling('ws://192.168.0.6:8080/');

const startVideo = async() => {
    try {
        await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    } catch(err) {
        console.error('mediaDevices.getUserMedia() error:', err);
    }
}

(()=> {
    startVideo();
})();