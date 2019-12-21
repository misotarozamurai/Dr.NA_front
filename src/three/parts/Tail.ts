import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import LoaderGroup from './LoaderGroup';

export default class Tail extends LoaderGroup {
    private readonly FILENAME = 'tail.gltf';
    private _material: THREE.Material;

    constructor(material: THREE.Material) {
        super();
        this._material = material;
        this.name = 'tail';
        this.setTail();
    }

    private setTail = (): void => {
        this.Loader.load(this.PATH + this.FILENAME, (data: GLTF)=>{
            const tail = data.scene;
            tail.children.forEach((mesh: THREE.Object3D)=>(<THREE.Mesh>mesh).material = this.material);
            tail.scale.set(40,25,40);
            this.add(tail);
        });
    };
  
    get material(): THREE.Material {
        return this._material;
    }
    set material(material: THREE.Material) {
        this._material = material;
        super.setMaterial(this.material);
    }
}