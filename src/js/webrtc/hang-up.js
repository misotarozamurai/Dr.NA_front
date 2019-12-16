'use strict'

import {remoteVideo, peerConnection, negotiationneededCounter} from 'webrtc/prepare-connection'
import {peerDataChannel} from 'webrtc/data-channel'
import {wsSock} from 'signaling'

//--------------------------------------------------------------------------
// P2Pの切断処理を行う
//--------------------------------------------------------------------------
export const hangUp = () => {
    if(peerConnection.peerObj) {
        if(peerConnection.peerObj.iceConnectionState !== false) {
            peerDataChannel.dataChannel.close();
            peerConnection.peerObj.close();
            peerConnection.peerObj = null;
            negotiationneededCounter.negoCount = 0;
            const message = JSON.stringify({type: 'close'});
            console.log('sending close message');
            wsSock.sock.send(message);
            cleanupVideoElement(remoteVideo);
            return;
        }
    }
    console.log('peerConnection is closed.')
}

const cleanupVideoElement = element => {
    element.pause();
    element.srcObject = null;
}