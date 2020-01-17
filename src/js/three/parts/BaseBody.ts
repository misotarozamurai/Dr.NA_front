import CANNON from 'cannon';
import BaseInterface from './BaseInterface';
import Util from '../Utility';

export class BaseBody extends CANNON.Body implements BaseInterface {

    private readonly config = CONFIG.Three.Parts.Base;
    private spherePosition: number;

    constructor(initStatus: ObjectStatus){
        super({mass:10});
        
        this.spherePosition = this.config.Length/2-this.config.Diameter;

        this.createBase();
        this.setStatus(initStatus);
    }

    private createBase(): void {
        const cylinder_length = this.config.Length - this.config.Diameter*2;
        const cylinder = new CANNON.Cylinder(
            this.config.Diameter,
            this.config.Diameter,
            cylinder_length,
            this.config.Segments
        );
        const sphere = new CANNON.Sphere(this.config.Diameter);
        const sphere_copy = Object.assign(sphere);

        const cylinder_rotate = new CANNON.Quaternion().setFromEuler(0,Util.rad(90),0);

        this.addShape(cylinder,undefined,cylinder_rotate);
        this.addShape(sphere,new CANNON.Vec3(this.spherePosition,0,0));
        this.addShape(sphere_copy,new CANNON.Vec3(-this.spherePosition,0,0));
    }

    public setStatus(status: ObjectStatus): void {
        this.position = new CANNON.Vec3(...status.position);
        this.quaternion = new CANNON.Quaternion(...status.quaternion);
    }

    public getObjectStatus(): ObjectStatus{
        return {
            position:this.position.toArray(),
            quaternion:this.quaternion.toArray(),
        };
    }
}