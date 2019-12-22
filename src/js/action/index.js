'use strict'

import {animationPlayback} from 'action/sick'
import {createPulse} from 'action/pulse'

//--------------------------------------------------------------------------
// データ受信をしたら制御を行う
//--------------------------------------------------------------------------
export const getResultData = datas => {
    // Create ECG from pulse data
    const pulse = datas.pulse;
    const height = datas.height;
    createPulse(pulse, height);

    // Start animation from sick data
    const sick = datas.sick;
    animationPlayback(sick);
}