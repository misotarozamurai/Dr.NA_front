'use strict'

navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia ;
window.URL = window.URL || window.webkitURL;

import {sendSdp} from 'webrtc/send-sdp'
import {hangUp} from 'webrtc/hang-up'
import {sendIceCandidate} from 'webrtc/ice-candaidate'
import {prepareDataChannel} from 'webrtc/data-channel'

// カメラ映像再生用DOM
export const remoteVideo = document.getElementById('remote-video');

export const negotiationneededCounter = {
    _count: 0,
    get negoCount() {
        return this._count;
    },
    set negoCount(cntData) {
        this._count = cntData;
    }
}

// RTCPeerConnection setter getter
export const peerConnection = {
    _peerObj: null,
    get peerObj() {
        return this._peerObj;
    },
    set peerObj(peerObj) {
        this._peerObj = peerObj;
    }
}

//--------------------------------------------------------------------------
// メディアデータを取得し、メディアの再生を開始する
//--------------------------------------------------------------------------
const playVideo = async(element, stream) => {
    element.srcObject = stream;
    try {
        await element.play();
    } catch(err) {
        console.log('auto play error', err);
    }
}

//--------------------------------------------------------------------------
// WebRTCを繋げる
//--------------------------------------------------------------------------
export class PrepareNewConnection extends RTCPeerConnection {
    constructor(isOffer) {
        // SkyWayが提供するSTUNサーバを設定
        // 「pc_config」なくても行ける
        const pc_config = {'iceServers': [{'urls': 'stun:stun.webrtc.ecl.ntt.com:3478'}]};
        super(pc_config);

        // RTCPeerConnection.createDataChannel()
        prepareDataChannel(this);

        // リモートのMediaStreamTrackを受信したらメディアの再生を行う
        this.ontrack = evt =>{
            console.log('-- peer.ontrack()');
            playVideo(remoteVideo, evt.streams[0]);
        }

        this.onicecandidate = evt => {
            if(evt.candidate) {
                // イベントが発火するたびにICE Candidateをシグナリングサーバへ送信する
                sendIceCandidate(evt.candidate);
            } else {
                console.log('empty ice event');
            }
        }

        // Offer側でネゴシエーションが必要になったときの処理
        this.onnegotiationneeded = async() => {
            try {
                if(isOffer) {
                    if(negotiationneededCounter.negoCount === 0) {
                        // SDP（ブラウザが利用可能なWebRTCの通信に必要な各種情報）が生成される
                        let offer = await this.createOffer();
                        console.log('createOffer() succsess in promise');
                        // 生成されたSDPをセットする
                        await this.setLocalDescription(offer);
                        console.log('setLocalDescription() succsess in promise');
                        sendSdp(peer.localDescription);
                        negotiationneededCounter.negoCount ++;
                    }
                }
            } catch(err) {
                console.error('setLocalDescription(offer) ERR: ', err);
            }
        }

        // ICEのステータスが変更になったときの処理(切断時)
        this.onconnectionstatechange = () => {
            // console.log('ICE connection Status has changed to ' + this.iceConnectionState);
            switch(this.iceConnectionState) {
                // ICEの状態
                case 'closed':
                // ネットワークの状態等が変更になりP2P通信経路が維持できなくなった場合
                case 'failed':
                    // 切断処理の実行を行う
                    if(peerConnection.peerObj) hangUp();
                    break;
                // 一時的に通信が切れた場合
                case 'disconnected':
                    break;
            }
        };

        peerConnection.peerObj = this;
    }
}