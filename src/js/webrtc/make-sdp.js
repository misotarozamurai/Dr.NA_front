'use strict'

import {peerConnection} from 'webrtc/prepare-connection'
import {sendSdp} from 'webrtc/send-sdp'

//--------------------------------------------------------------------------
// Answer SDPを生成し、シグナリングサーバへ送信します
//--------------------------------------------------------------------------
export const makeAnswer = async() => {
    if(!peerConnection.peerObj) {
        console.log('peerConnection NOT exist!');
        return;
    }
    try {
        // RTCPeerConnection を作成する
        let answer = await peerConnection.peerObj.createAnswer();
        console.log('createAnswer() succsess in promise');
        // AnswerのSDPをセットする
        await peerConnection.peerObj.setLocalDescription(answer);
        console.log('setLocalDescription() succsess in promise');
        // SDPをシグナリングサーバへ送信する
        sendSdp(peerConnection.peerObj.localDescription);
    } catch(err) {
        console.error(err);
    }
}