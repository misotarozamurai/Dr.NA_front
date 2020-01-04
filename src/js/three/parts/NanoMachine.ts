import * as THREE from 'three';
import { BaseMesh, Horns, Tail} from './';
import Util from '../Utility';

export class NanoMachine extends THREE.Group {
    private speed:          number;

    private capsule:        BaseMesh;
    private _tail:          Tail;
    private _horns:         Horns;

    constructor(mainMaterial: THREE.Material) {
        super();

        this.speed = Math.random();

        const tailMaterial = mainMaterial.clone();
        tailMaterial.setValues({transparent:true,opacity:1.0});
        
        this.capsule = new BaseMesh(mainMaterial);
        this._tail = new Tail(tailMaterial);
        this._horns = new Horns();
    
        this._horns.position.x = -2;
        this._tail.position.x = 5;
        this._tail.rotateZ(Util.rad(-90));

        this.add(new THREE.PointLight(0x555555,.1));

        this.add(this.capsule,this._tail,this._horns);
        this.rotateZ(Util.rad(-90));
    }

    private createTMateriral(material: THREE.Material): THREE.Material {
        const tm = material.clone();
        tm.setValues({transparent:true,opacity:1.0})
        return tm;
    }

    public setMaterial(material: THREE.Material) {
        this.capsule.material = material;
        this.tail.material = this.createTMateriral(material);
    }

    public getObjectStatus():ObjectStatus {
        const position = this.getWorldPosition(new THREE.Vector3);
        const quaternion = this.getWorldQuaternion(new THREE.Quaternion);
        return {
            position:position.toArray(),
            quaternion:quaternion.toArray(),
        };
    }

    public move(): void {
        this.position.y += this.speed;
    }

    public tailRotate(rad: number) {
        this.tail.rotateY(rad);
    }

    get tail(): Tail {
        return this._tail;
    }
    
    get horns(): Horns {
        return this._horns;
    }
}