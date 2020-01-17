import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import Util from './Utility';
import {NanoMachine,BaseMesh,Pair} from './parts';


export default class DNATween {

    // private CAMERA_PULL = 40;
    private readonly config = CONFIG.Three.DNA.Tween;

    private nm:             NanoMachine;
    private target:         BaseMesh;
    private targetPos:      THREE.Vector3;
    private targetPair:     Pair;
    private camera:         THREE.Camera;
    private prevNmPos:      THREE.Vector3;
    private nmForward:      THREE.Vector3;

    //Tweens
    // private moveFirstTween: TWEEN.Tween;
    private moveEndTween:   TWEEN.Tween;
    private rotateTween:    TWEEN.Tween;
    private cameraTween:    TWEEN.Tween;
    private pargeTweens:     TWEEN.Tween[];

    private _isComplete:     Boolean;
    

    constructor(
        nm:         NanoMachine,
        targetPair: Pair,
        target:     BaseMesh,
        materials:  THREE.Material[],
        camera:     THREE.Camera 
    ) {
        
        this.nm = nm;
        this.target = target;
        this.targetPos = 
            new THREE.Vector3().copy(
                this.target.getWorldPosition(new THREE.Vector3)
            );
        this.targetPair = targetPair;
        this.camera = camera;
        this.prevNmPos = this.nm.position.clone();
        this.nmForward = new THREE.Vector3(0,1,0);

        // camera reset 
        this.traceCamera();

        const cam_last =
            new THREE.Vector3(
                this.config.CameraPull,
                targetPair.position.y,
                this.config.CameraPull
            );
        
        this.cameraTween =
            new TWEEN.Tween(this.camera.position)
            .to(cam_last,this.config.Times.CameraLast)
            .delay(this.config.Times.CameraDeley)
            .onUpdate(() => this.camera.lookAt(targetPair.position))
            .onComplete(()=> this._isComplete = true);

        this.pargeTweens = [];
        materials.forEach(
            material => this.pargeTweens.push(
                new TWEEN.Tween(material)
                .to({opacity:0},this.config.Times.Parge)
            )
        );
        this.pargeTweens[0]
            .onComplete(()=>nm.remove(nm.horns,nm.tail));

        this.rotateTween = 
            new TWEEN.Tween(this.nm.quaternion)
            .to(
                this.target.quaternion
                    .clone()
                    .setFromEuler(
                        new THREE.Euler(0,0,Util.rad(180))
                    ),
                this.config.Times.Rotate
            )
            .chain(this.cameraTween);

        this.moveEndTween = 
            new TWEEN.Tween(this.nm.position)
            .to(this.targetPos,this.config.Times.Move)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(this.moveUpdate)
            .onComplete(this.moveComplete)
            .chain(this.rotateTween,...this.pargeTweens);    

        // const middlePos = new THREE.Vector3(this.nm.position.x,1000,this.nm.position.z);
        // this.moveFirstTween = new TWEEN.Tween(this.nm.position)
        //     .to(middlePos,3000)
        //     .easing(TWEEN.Easing.Quadratic.Out)
        //     .onUpdate(this.moveUpdate)
        //     .chain(this.moveEndTween);

        this._isComplete = false;
    }

    private rotateNm(): void {

    }

    private traceCamera(): void {
        const back = this.nmForward.clone().negate();
        back.multiplyScalar(this.config.CameraPull);
        const camera_pos = back.add(this.nm.getWorldPosition(new THREE.Vector3));
        this.camera.position.copy(camera_pos);
        this.camera.position.y += 10;
        this.camera.lookAt(this.nm.getWorldPosition(new THREE.Vector3));
    }

    private moveUpdate = (): void => {
        this.rotateNm();
        this.traceCamera();
    }

    private moveComplete = (): void => {
        this.targetPair.add(this.nm);
        this.nm.position.copy(this.target.position);
    }

    public start(): void {this.moveEndTween.start()}

    public isPlaying(): boolean { 
        return this.moveEndTween.isPlaying() 
            || this.rotateTween.isPlaying() 
            || this.cameraTween.isPlaying();
    } 

    get isComplete(): Boolean {
        return this._isComplete;
    }

    public update = (): void => {
        // console.log(this.camera.position);
        this.target.getWorldPosition(this.targetPos);
        this.prevNmPos = this.nm.position.clone();
        TWEEN.update();
        this.nmForward = 
            this.nm.position
            .clone()
            .sub(this.prevNmPos)
            .normalize();
    }
}