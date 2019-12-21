'use strict'

//--------------------------------------------------------------------------
// getUserMediaで、カメラを操作する
//--------------------------------------------------------------------------
// ----- Set camera to browser full screen view -----
const videoStyle = {
    aspectRatio: {
        exact: 1.7777777778
    }, 
    width: window.parent.screen.width,
    height: window.parent.screen.height
}

// The user is asked for permission to use the media, and if so, the stream is returned.
// Play media from the passed stream.
export const startVideo = async() => {
    try {
        let local_stream = await navigator.mediaDevices.getUserMedia({video: videoStyle, audio: false});
        playVideo(local_stream);
    } catch(err) {
        console.error('mediaDevices.getUserMedia() error:', err);
    }
}

// Get the media stream and start playing the media
const playVideo = async(stream) => {
    const local_video = document.getElementById('local-video');
    local_video.srcObject = stream;
    try {
        await local_video.play();
    } catch(err) {
        console.log('auto play error', err);
    }
}