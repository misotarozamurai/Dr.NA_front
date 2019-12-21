'use strict'

import 'reset_style.css'
import 'style.css'
import 'core-js'
import 'regenerator-runtime/runtime'
import _ from 'lodash'
import {startVideo} from 'devise'
import {WsSock} from 'socket'

const webSock = new WsSock('ws://localhost:8080/');

(()=> {
    startVideo();
})();