'use strict'

import {wsSock} from 'signaling'
import {peerConnection} from 'webrtc/prepare-connection'

//--------------------------------------------------------------------------
// ICE candidate 送信時、受信時の処理を行う
//--------------------------------------------------------------------------
// ICE candaidate受信時にセットする
export const addIceCandidate = candidate => {
    if(peerConnection.peerObj) {
        // ICE candidateを受信したら、都度addIceCandidateを利用してブラウザにセットしていく
        peerConnection.peerObj.addIceCandidate(candidate);
    } else {
        console.error('PeerConnection not exist!');
        return;
    }
}

// ICE candidate生成時に送信する
export const sendIceCandidate = candidate => {
    console.log('---sending ICE candidate ---');
    // ICE candidate生成時には、JSONに変換しシグナリングサーバに送信
    const message = JSON.stringify({type: 'candidate', ice: candidate});
    // console.log('sending candidate=' + message);
    wsSock.sock.send(message);
}