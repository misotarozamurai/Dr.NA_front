'use strict'

import {setOffer} from 'webrtc'
import {addIceCandidate} from 'webrtc/ice-candaidate'
import {hangUp} from 'webrtc/hang-up'

//--------------------------------------------------------------------------
// シグナリングサーバへ接続する処理
//--------------------------------------------------------------------------
export class Signaling extends WebSocket {
    constructor(wsUrl) {
        super(wsUrl);
        // 接続がされた場合
        this.onopen = evt => console.log('webSocket open!');
        
        // エラーが発生した場合
        this.onerror = err => console.error('webSocket onerror ERR: ', err);

        // SDPを受信した場合
        this.onmessage = evt => {
            console.log('webSocket onmessage()');
            const message = JSON.parse(evt.data);
            switch(message.type) {
                // 通信を始める側から送るSDPを受信したら
                case 'offer':
                    console.log('Received offer ...');
                    setOffer(message.sdp);
                    break;
                case 'candidate':
                    console.log('Received ICE candidate ...');
                    const candidate = new RTCIceCandidate(message.ice);
                    addIceCandidate(candidate);
                    break;
                // 切断要求を受信したら 
                case 'close':
                    console.log('peer is closed ...');
                    hangUp();
                    break;
                default:
                    console.log('Invalid message');
                    break;
            }
            
        };
    }
}
