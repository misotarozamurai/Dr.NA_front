'use strict'

import {SmoothieChart, TimeSeries} from 'smoothie'

//--------------------------------------------------------------------------
// 脈データを受け取り心電図を作成します
//--------------------------------------------------------------------------
let aryPulse = null;
let aryIndex = 0;
export const ecgDrawing = pluse => {
    // aryPulse = [60,70,54,50,60,70,54,50,30,50,60,70,54,50,60,70,54,50,30,50,];
    aryPulse = formattingPulse(pluse);

    // Find the canvas
    const canvas = document.getElementById('pulse-canvas');
    
    // Create a time series
    const series = new TimeSeries();

    // Create the chart
    const chart = new SmoothieChart();
    chart.addTimeSeries(series, { strokeStyle: 'rgba(0, 255, 0, 1)' });
    chart.streamTo(canvas, 500);

    // I will draw pulse data
    setInterval( ()=> {
        let data = returnPulse();
        series.append(Date.now(), data);
    },  400);

    // ----- Returns the numerical value of the ECG data ----
    const returnPulse = () => aryPulse[receiveData()];

    // ----- Repeat ECG data -----
    const receiveData = () => {
        if(aryIndex + 1 < aryPulse.length) {
            aryIndex++;
            return aryIndex;
        } 
        aryIndex = 0;
        return aryIndex;
    }
}

// ----- Shape and return pulse data -----
const formattingPulse = pulse => {
    const max = Math.max.apply(null, pulse);
    const min = Math.min.apply(null, pulse);
    const interme = IntermediateValue(max, min);

    // Format data in array
    const shaping = [interme];
    _.forEach(pulse, data => {
        shaping.push(data);
        shaping.push(interme);
    });
    return shaping;
}

// ----- Find intermediate value between maximum and minimum -----
const IntermediateValue = (max, min) => ((max - min) / 2) + min;