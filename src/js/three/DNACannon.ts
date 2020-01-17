import CANNON from 'cannon';
import {BaseBody, BaseMesh, Pair, NanoMachine} from './parts';


export default class DNACannon {
    
    private STEP_NUM = 1/60;

    private world:      CANNON.World;
    private _collision: boolean;
    private _nm:        BaseBody;
    private _target:    BaseBody;


    constructor(scene: THREE.Scene, nm: NanoMachine, targetPair: Pair, target: BaseMesh) {
        this.world = this.initWorld();

        this._collision = false;
        this._nm = new BaseBody(nm.getObjectStatus());
        this.world.addBody(this.nm);

        this._target = new BaseBody(target.getObjectStatus());
        this.world.addBody(this.target);

        this._target.addEventListener('collide',() => {
            this._collision = true;
            targetPair.remove(target);
            scene.add(target);
            target.setStatus(this._target.getObjectStatus());
        });
    }

    private initWorld(): CANNON.World{
        const world = new CANNON.World();
        world.broadphase = new CANNON.NaiveBroadphase();
        world.solver.iterations = 8;
        return world;
    }

    public step() {
        this.world.step(this.STEP_NUM);
    };

    get nm():BaseBody {
        return this._nm;
    }
    get target():BaseBody {
        return this._target;
    }
    get collision():boolean {
        return this._collision;
    }
}