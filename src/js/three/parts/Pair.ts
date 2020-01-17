import * as THREE from 'three';
import { BaseMesh } from './';

export class Pair extends THREE.Group {
    private readonly config = CONFIG.Three.Parts.Base;
    private BASE_POSITION = [
        -(this.config.Length/2),
        this.config.Length/2
    ];   

    private materials: MaterialPair;

    constructor(materials: MaterialPair) {
        super();
        this.materials = materials;
        this.createPair();
    }

    private createPair = ():void => {
        const color_selector = Math.random()<.5;
        const pair = [
                new BaseMesh(this.materials[+!color_selector]),
                new BaseMesh(this.materials[+color_selector])
            ];
        pair.forEach((pair,i) => pair.position.x = this.BASE_POSITION[i]);
        this.add(...pair);
    };
}