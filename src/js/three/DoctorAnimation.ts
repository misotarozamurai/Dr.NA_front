import THREE from 'three';

import ThreeAnimation from './ThreeAnimation';
import { Doctor } from './parts';

export default class DoctorAnimation extends ThreeAnimation<THREE.PerspectiveCamera> {

    private doctor:     Doctor;
    private armPos:     number;

    constructor(armPos: number) {
        super();
        this.armPos = armPos;
        this.doctor = new Doctor();
    }


    protected animate() {
        
    }
}