'use strict'

import {getResultData} from 'action'

// ----- Analysis start flag -----
export const dataFlaw = {
    _flg: true,
    get flg() {
        return this._flg;
    },
    set flg(flg) {
        this._flg = flg;
    }
}

// ----- Socket storage -----
export const sockObj = {
    _sock: null,
    get sock() {
        return this._sock;
    },
    set sock(obj) {
        this._sock = obj;
    } 
}

//--------------------------------------------------------------------------
// webSocketへ接続する処理
//--------------------------------------------------------------------------
export class WsSock extends WebSocket {
    constructor(wsUrl) {
        super(wsUrl);
        // 接続がされた場合
        this.onopen = evt => {
            console.log('webSocket open!');
            sockObj.sock = this;
        }
        // エラーが発生した場合
        this.onerror = err => console.error('webSocket onerror ERR: ', err);
        // メッセージを受信した場合
        this.onmessage = evt => {
            console.log('webSocket onmessage()');
            const message = JSON.parse(evt.data);
            switch(message.type) {
                case "result":
                    if(dataFlaw.flg) {
                        dataFlaw.flg = false;
                        getResultData(message);
                    }
                    break;
                default:
                    console.log('Invalid message');
                    break;
            }
        };
    } 
}