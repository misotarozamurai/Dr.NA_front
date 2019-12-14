'use strict'

// RTCDataChannel setter getter
export const peerDataChannel = {
    _channel: null,
    get dataChannel() {
        return this._channel;
    },
    set dataChannel(channelObj) {
        this._channel = channelObj;
    }
}
//--------------------------------------------------------------------------
// リモートピアにリンクされた新しいチャネルを作成
//--------------------------------------------------------------------------
export const prepareDataChannel = peer => {
    peer.ondatachannel = evt => {
        peerDataChannel.dataChannel = evt.channel;

        // 接続された場合
        peerDataChannel.dataChannel.onopen = evt => peerDataChannel.dataChannel.send('Hi back!');

        // 切断された場合
        peerDataChannel.dataChannel.onclose = evt => console.log('DataChannel close()');

        // エラーが発生した場合
        peerDataChannel.dataChannel.onerror = err => console.error('DataChannel onerror ERR: ', err);

        // メッセージを受け取った場合
        peerDataChannel.dataChannel.onmessage = evt => {
            console.log('DataChannel onmessage()');
            const message = JSON.parse(evt.data);
            switch(message.type) {
                // 脈データを受け取った場合
                case 'pulse':
                    break;
                // 病気の解析結果を受け取った場合
                case 'sick':
                    break;
                default:
                    console.log('Invalid message');
                    break;
            }
        }
    };
}