'use strict'

import {animationPlayback} from 'action/sick'

//--------------------------------------------------------------------------
// データ受信をしたら制御を行う
//--------------------------------------------------------------------------
export const getResultData = datas => {
    const sick = datas.sick;
    // Start animation from sick data
    animationPlayback(sick);
}