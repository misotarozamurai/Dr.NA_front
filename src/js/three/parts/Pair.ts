import * as THREE from 'three';
import BaseMesh from './BaseMesh';
import BaseConst from './BaseConst';

export default class Pair extends THREE.Group {
    private BASE_LENGTH = BaseConst.LENGTH;
    private BASE_POSITION = [
        -(this.BASE_LENGTH/2),
        this.BASE_LENGTH/2
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