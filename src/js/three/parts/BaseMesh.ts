import * as THREE from 'three';
import BaseConst from './BaseConst';
import Util from '../Utility';

export class BaseMesh extends THREE.Group {
    private _material: THREE.Material;

    constructor(material: THREE.Material){    
        super();
        this._material = material;
        this.createBase();
    }

    set material(material: THREE.Material) {
        this._material = material;
        this.children.forEach((obj: THREE.Object3D)=>{(<THREE.Mesh>obj).material = this._material});
    }

    private createBase(): void {
        const cylinder_length = BaseConst.LENGTH - BaseConst.DIAMETER * 2;
        const cylinder = 
            new THREE.Mesh(
                new THREE.CylinderGeometry(BaseConst.DIAMETER,BaseConst.DIAMETER,cylinder_length,BaseConst.SEGMENTS),
                this._material
            );
        const sphere = 
            new THREE.Mesh(
                new THREE.SphereGeometry(BaseConst.DIAMETER),
                this._material
                );
        const sphere_copy = sphere.clone();
        cylinder.rotation.z = Util.rad(90);
        sphere.position.x = BaseConst.SPHERE_POSITION;
        sphere_copy.position.x = -BaseConst.SPHERE_POSITION;
        this.add(cylinder,sphere,sphere_copy);
        this.name = 'Base';
    }

    public setStatus(status:ObjectStatus): void {
        this.position.fromArray(status.position);
        this.quaternion.fromArray(status.quaternion);
    }

    public getObjectStatus():ObjectStatus {
        return {
            position: this.getWorldPosition(new THREE.Vector3).toArray(),
            quaternion:this.getWorldQuaternion(new THREE.Quaternion).toArray(),
        };
    }
}