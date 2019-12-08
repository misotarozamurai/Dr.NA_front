'use strict'

import {peerConnection, PrepareNewConnection} from 'webrtc/prepare-connection'
import {makeAnswer} from 'webrtc/make-sdp'

//--------------------------------------------------------------------------
// Offer側からのSDPをセットする
//--------------------------------------------------------------------------
export const setOffer = async(sessionDescription) => {
    if(peerConnection.peerObj) console.error('peerConnection alreay exist!');
    // falseで実行を行い、webRTCの接続準備を行う
    peerConnection.peerObj = new PrepareNewConnection(false);
    try {
        // 相手から受信したSDPをセットする
        await peerConnection.peerObj.setRemoteDescription(sessionDescription);
        console.log('setRemoteDescription(answer) succsess in promise');
        // AnswerのSDPの生成を行う
        makeAnswer();
    } catch(err) {
        console.error('setRemoteDescription(offer) ERR: ', err);
    }
}