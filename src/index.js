'use strict'

import 'reset_style.css'
import 'style.css'
import {Signaling} from 'signaling'

const webSock = new Signaling('ws://192.168.0.5:8080/');