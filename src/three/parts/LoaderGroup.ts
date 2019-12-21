import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Material } from 'cannon';

export default class LoaderGroup extends THREE.Group {
    protected PATH:     string;
    protected Loader:   GLTFLoader;
    
    constructor() {
        super();
        this.PATH = '../assets/';
        this.Loader = new GLTFLoader();
    }

    protected setMaterial(material: THREE.Material) {
        this.children.forEach((scene: THREE.Object3D) => {
            scene.children.forEach((obj: THREE.Object3D) => (<THREE.Mesh>obj).material = material);
        });
    }
} 