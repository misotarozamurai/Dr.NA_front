'use strict'

import {wsSock} from 'signaling'

//--------------------------------------------------------------------------
// シグナリングで交換する情報を送信します
//--------------------------------------------------------------------------
export const sendSdp = sessionDescription => {
    console.log('---sending sdp ---');
    const message = JSON.stringify(sessionDescription);
    wsSock.sock.send(message);
}