'use strict'

import 'reset_style.css'
import 'style.sass'
import 'core-js'
import 'regenerator-runtime/runtime'
import _ from 'lodash'
import {startVideo} from 'devise'
import {WsSock} from 'socket'

const config = CONFIG.WebSocket;
const webSock = new WsSock(`wss://${config.Address}:${config.Port}${config.Path}`);

(()=> {
    startVideo();
})();
