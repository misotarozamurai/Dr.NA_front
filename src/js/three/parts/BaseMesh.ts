import * as THREE from 'three';
import BaseInterface from './BaseInterface';
import Util from '../Utility';

export class BaseMesh extends THREE.Group implements BaseInterface {
    private readonly config = CONFIG.Three.Parts.Base; 
    private spherePosition:     number;
    private _material:          THREE.Material;

    constructor(material: THREE.Material){    
        super();

        this.spherePosition = this.config.Length/2-this.config.Diameter;
        
        this._material = material;
        this.createBase();
    }

    set material(material: THREE.Material) {
        this._material = material;
        this.children.forEach((obj: THREE.Object3D)=>{(<THREE.Mesh>obj).material = this._material});
    }

    private createBase(): void {
        const cylinder_length = this.config.Length - this.config.Diameter * 2;
        const cylinder = 
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    this.config.Diameter,
                    this.config.Diameter,
                    cylinder_length,
                    this.config.Segments),
                this._material
            );
        const sphere = 
            new THREE.Mesh(
                new THREE.SphereGeometry(this.config.DIAMETER),
                this._material
                );
        const sphere_copy = sphere.clone();
        cylinder.rotation.z = Util.rad(90);
        sphere.position.x = this.spherePosition;
        sphere_copy.position.x = -this.spherePosition;
        this.add(cylinder,sphere,sphere_copy);
        this.name = 'Base';
    }

    public setStatus(status: ObjectStatus): void {
        this.position.fromArray(status.position);
        this.quaternion.fromArray(status.quaternion);
    }

    public getObjectStatus(): ObjectStatus {
        return {
            position: this.getWorldPosition(new THREE.Vector3).toArray(),
            quaternion:this.getWorldQuaternion(new THREE.Quaternion).toArray(),
        };
    }
}