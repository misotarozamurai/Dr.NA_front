import * as THREE from 'three';
import { Helixes, Pair } from './';
import Util from '../Utility';

export class DNA extends THREE.Group {
    private config = CONFIG.Three.Parts.DNA;
    private readonly COLOR_NUMS: ColorPair[] = [
        [0x0000aa,0xaa0000],
        [0x00aa00,0xaa00aa]
    ];


    private pairNumber:     number;
    private _pairs:         THREE.Group;
    private colorMaterials: MaterialPair[];


    constructor(pairNumber: number) {
        super();

        this.pairNumber = pairNumber;
        this.colorMaterials = [];
        this.COLOR_NUMS.forEach(
            (colors: ColorPair) => {
                this.colorMaterials.push(this.createMaterialPair(colors));
            }
        );
        this._pairs = this.createPairs();

        this.add(new Helixes(),this.pairs)
    }


    private createPairs(): THREE.Group {
        const pairs = new THREE.Group();
        for (let twist = -53,i = 0; i < this.pairNumber; i++) {
            const color_pair_selector = Math.random() <.5;
            const pair = new Pair(this.colorMaterials[+color_pair_selector]);
            pair.position.y = i * this.config.PairSpaceY;
            if(i!==0)twist-=32;
            pair.rotateY(Util.rad(twist));
            pairs.add(pair);;
        }
        return pairs;
    }

    private createMaterialPair(colors: ColorPair):MaterialPair {
        const materials: THREE.Material[] = [];
        colors.forEach((color:number)=>materials.push(new THREE.MeshStandardMaterial({color:color})));
        return <MaterialPair>materials;
    }    

    get pairs(): THREE.Group {
        return this._pairs;
    }
}