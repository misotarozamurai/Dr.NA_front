import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import LoaderGroup from './LoaderGroup';
import Util from '../Utility';

export class Helixes extends LoaderGroup {
    private readonly FILENAME = 'dna.gltf';
    private readonly COLORS = [
        0xff5555,
        0x5555ff
    ];
    
    constructor() {
        super();    
        this.setHelixes();
        super.setMaterial(new THREE.MeshStandardMaterial({color:0x555555}));
    }

    private setHelixes() {
        this.Loader.load(this.PATH + this.FILENAME, (data: GLTF)=>{
            data.scene.children.forEach(
                (mesh: THREE.Object3D, i: number) => {
                    (<THREE.Mesh>mesh).material = 
                        new THREE.MeshStandardMaterial({color: this.COLORS[i]})
                }
            );
            this.add(data.scene);
            this.position.y = -2.5;
            this.scale.set(45,45,45);
            this.rotateY(Util.rad(45));
        });
    }
}