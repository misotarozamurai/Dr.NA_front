import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class LoaderGroup extends THREE.Group {
    protected readonly PATH = CONFIG.Three.Parts.AssetsPath;
    protected readonly Loader:   GLTFLoader;
    
    constructor() {
        super();
        this.Loader = new GLTFLoader();
    }

    protected setMaterial(material: THREE.Material) {
        this.children.forEach((scene: THREE.Object3D) => {
            scene.children.forEach((obj: THREE.Object3D) => (<THREE.Mesh>obj).material = material);
        });
    }
} 