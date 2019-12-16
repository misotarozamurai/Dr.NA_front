'use strict'

//--------------------------------------------------------------------------
// getUserMediaで、カメラを操作する
//--------------------------------------------------------------------------

const videoStyle = {
    aspectRatio: {
        exact: 1.7777777778
    }, 
    width: window.parent.screen.width,
    high: window.parent.screen.height
}


// ユーザからのメディア使用許可を求めて、許可されればストリームが返される。
// 渡されたストリームからメディアの再生を行う。
export const startVideo = async() => {
    try {
        let local_stream = await navigator.mediaDevices.getUserMedia({video: videoStyle, audio: false});
        playVideo(local_stream);
    } catch(err) {
        console.error('mediaDevices.getUserMedia() error:', err);
    }
}

// メディアデータを取得し、メディアの再生を開始する
const playVideo = async(stream) => {
    const local_video = document.getElementById('local-video');
    local_video.srcObject = stream;
    try {
        await local_video.play();
    } catch(err) {
        console.log('auto play error', err);
    }
}