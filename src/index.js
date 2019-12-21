'use strict'

import 'reset_style.css'
import 'style.css'
<<<<<<< HEAD
import DNAAnimation from './three/DNAAnimation';

const animation = new DNAAnimation()


animation.animate();

setTimeout(() => animation.start(),1000);


window.addEventListener('resize',()=>animation.onResize());


=======
import 'core-js'
import 'regenerator-runtime/runtime'
import _ from 'lodash'
import {startVideo} from 'devise'
import {WsSock} from 'socket'

const webSock = new WsSock('ws://localhost:8080/');

(()=> {
    startVideo();
})();
>>>>>>> master
