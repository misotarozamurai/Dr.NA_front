import CANNON from 'cannon';
import { BaseConst } from './';
import Util from '../Utility';

export class BaseBody extends CANNON.Body {
    constructor(initStatus: ObjectStatus){
        super({mass:10});
        this.createBase();
        this.setStatus(initStatus);
    }

    private createBase(): void {
        const cylinder_length = BaseConst.LENGTH-BaseConst.DIAMETER*2;
        const cylinder = new CANNON.Cylinder(BaseConst.DIAMETER,BaseConst.DIAMETER,cylinder_length,BaseConst.SEGMENTS);
        const sphere = new CANNON.Sphere(BaseConst.DIAMETER);
        const sphere_copy = Object.assign(sphere);

        const sphere_x = cylinder_length/2;
        const cylinder_rotate = new CANNON.Quaternion().setFromEuler(0,Util.rad(90),0);

        this.addShape(cylinder,undefined,cylinder_rotate);
        this.addShape(sphere,new CANNON.Vec3(sphere_x,0,0));
        this.addShape(sphere_copy,new CANNON.Vec3(-sphere_x,0,0));
    }

    public setStatus(status:ObjectStatus): void {
        this.position = new CANNON.Vec3(...status.position);
        this.quaternion = new CANNON.Quaternion(...status.quaternion);
    }

    public getObjectStatus():ObjectStatus{
        return {
            position:this.position.toArray(),
            quaternion:this.quaternion.toArray(),
        };
    }
}