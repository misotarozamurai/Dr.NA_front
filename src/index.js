'use strict'

import 'reset_style.css'
import 'style.css'
import 'core-js'
import 'regenerator-runtime/runtime'
import _ from 'lodash'
import {startVideo} from 'devise'
import {WsSock} from 'socket'
import { getResultData } from './js/action'

// const webSock = new WsSock('ws://localhost:8888/');

(()=> {
    startVideo();
})();

getResultData({message:'hoghoeg'});
