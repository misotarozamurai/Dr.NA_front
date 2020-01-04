import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

import LoaderGroup from './LoaderGroup';
import Util from '../Utility';

export class Horns extends LoaderGroup {
    private readonly FILENAME = 'horn.gltf';
    private _material: THREE.Material;

    constructor() {
        super();
        this._material = new THREE.MeshStandardMaterial({color: 0xffbbff,transparent:true,opacity:1.0});
        this.name = 'horns';
        this.setHorns();
        this.children.forEach((horn: THREE.Object3D)=>horn.rotateX(Util.rad(-5)));
    }

    private setHorns() {
        this.Loader.load(this.PATH + this.FILENAME, (data: GLTF)=>{
            const horn_scene = new THREE.Scene().copy(data.scene);
            horn_scene.children.forEach((mesh: THREE.Object3D)=>(<THREE.Mesh>mesh).material = this.material);
            horn_scene.scale.set(.5,.5,.5);
            horn_scene.rotateY(Util.rad(90));

            const horn_clone = horn_scene.clone();
            this.add(horn_scene,horn_clone);

            horn_scene.position.y = -.4;
            horn_clone.position.y = .4;
            
            horn_scene.rotateZ(Util.rad(180));
        });
    }

    get material() {
        return this._material;
    }
    set material(material:THREE.Material) {
        this._material = material;
        super.setMaterial(this.material);
    }
}