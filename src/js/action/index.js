'use strict'

import {animationPlayback} from 'action/sick'

//--------------------------------------------------------------------------
// データ受信をしたら制御を行う
//--------------------------------------------------------------------------
export const getResultData = datas => {
    // Start animation from sick data
    const sick = datas.sick;
    animationPlayback(sick);
}