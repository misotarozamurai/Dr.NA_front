'use strict'

import 'reset_style.css'
import 'style.css'
import DNAAnimation from './three/DNAAnimation';

const animation = new DNAAnimation()


animation.animate();

setTimeout(() => animation.start(),1000);


window.addEventListener('resize',()=>animation.onResize());


