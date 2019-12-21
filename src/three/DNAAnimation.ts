import * as THREE from 'three';
import BaseMesh from './parts/BaseMesh';
import NanoMachine from './parts/NanoMachine';
import DNA from './parts/DNA';
import Util from './Utility';
import Pair from './parts/Pair';
import DNACannon from './DNACannon';
import DNATween from './DNATween';



export default class DNAAnimation {

    private ROTATE_RAD = Util.rad(.5);

    private PAIR_NUMBER = 23;
    private TARGET_PAIR_MIN = 10;
    private TARGET_PAIR_MAX = this.PAIR_NUMBER - (this.TARGET_PAIR_MIN + 4);
    private TARGET_PAIR:number = this.TARGET_PAIR_MIN + Math.round(Math.random() * this.TARGET_PAIR_MAX);
    private TARGET_BASE = +(Math.random()>.5);

    private CREATE_NM_MIN = 3;
    private CREATE_NM_MAX = 6 - this.CREATE_NM_MIN;
    private NM_NUMBER = this.CREATE_NM_MIN + Math.round(Math.random() * this.CREATE_NM_MAX);
    private TARGET_NM = Math.floor(Math.random() * this.NM_NUMBER);

    /***********************************************
     * Three
     ***********************************************/
    private scene:          THREE.Scene;
    private renderer:       THREE.WebGLRenderer;
    private dom:            HTMLCanvasElement;
    private camera:         THREE.PerspectiveCamera;
    private light:          THREE.Light;


    // objects
    private nanoMachines:   NanoMachine[];
    private DNA:            DNA;

    private targetNM:       NanoMachine;
    private targetBase:     BaseMesh;
    private targetClone:    BaseMesh;

    /**********************************************
     * Tween
     **********************************************/
    private tween:          DNATween;
    

    /**********************************************
     * Cannon
     **********************************************/
    private cannon:         DNACannon;
    
    //debug
    private _isComplete = false;

    constructor(){

        // three
        this.scene = new THREE.Scene();    

        this.renderer = this.initRenderer();
        this.dom = this.renderer.domElement;
        this.camera = this.initCamera(this.scene);
        this.light = this.initLight(this.scene);
        
        this.nanoMachines = this.createNanoMachines();
        this.DNA = new DNA(this.PAIR_NUMBER);
        
        this.scene.add(this.DNA,...this.nanoMachines);

        // tween
        this.targetNM = this.nanoMachines.splice(this.TARGET_NM,1)[0];

        const targetPair = <Pair>this.DNA.pairs.children[this.TARGET_PAIR];

        this.targetBase = <BaseMesh>targetPair.children[this.TARGET_BASE];

        this.targetClone = this.targetBase.clone();
        this.targetClone.material = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
        targetPair.add(this.targetClone);
        this.targetNM.setMaterial(new THREE.MeshNormalMaterial());
        const nmMaterials = [
            this.targetNM.horns.material,
            this.targetNM.tail.material
        ];

        this.tween = new DNATween(this.targetNM,targetPair,this.targetClone,nmMaterials,this.camera);  
     

        // cannon
        this.cannon = new DNACannon(this.scene,this.targetNM,targetPair,this.targetBase);
        
        // this.scene.add(this);
        document.body.appendChild(this.dom);
    }

    private initRenderer():THREE.WebGLRenderer {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.gammaOutput = true;
        renderer.gammaFactor = 2.2;
        return renderer;
    }

    private initCamera(scene: THREE.Scene): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(
            75,                                         //視野
            window.innerWidth/window.innerHeight,       //アスペクト比
            0.1,                                        //ニアクリッピングレーン
            1000                                        //ファークリッピングレーン
        );
        scene.add(camera);
        return camera;
    }

    private initLight(scene: THREE.Scene): THREE.Light {
        const light = new THREE.DirectionalLight(0xaaaaaa);
        light.position.set(40,150,40);
        light.lookAt(0,0,0);
        scene.add(light);
        return light;
    }

    public onResize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    

    private createMaterial(): THREE.MeshStandardMaterial {
        const getSaturation = ()=> {
            const max = 256;
            const under = 200;
            const top = max - under;
            return under + Math.round(Math.random() * top);
        }
        let color = 1;
        for(let i=0; i<3 ; i++)color *= getSaturation();
        console.log('NanoMachine Color:','0x' + color.toString());
        return new THREE.MeshStandardMaterial({color:color-1});
    }

    private createNanoMachines(): NanoMachine[] {
        const nanomachines = [];
        for(let i = 0; i <= this.NM_NUMBER; i++){
            const material = this.createMaterial();
            nanomachines.push(new NanoMachine(material));
        }
        nanomachines.forEach((nm: NanoMachine, index: number)=>nm.position.set(index*5-100,0,-100));
        this.scene.add(...nanomachines);
        return nanomachines;
    }

    get isComplete(): boolean {
        return this._isComplete;
    }

    public start(): void {
        console.log('DNA Animation is Start!!!!!!');
        this.tween.start();
    }

    private update(): void {
        this.cannon.step();
        this.tween.update();
    }

    private gesture(): void {
        this.DNA.rotateY(this.ROTATE_RAD);
        const tail_rotate_rad = Util.rad(-5);
        this.targetNM.tailRotate(tail_rotate_rad);
        this.targetNM.rotateX(this.ROTATE_RAD);
        this.nanoMachines.forEach((nm: NanoMachine) => {
             nm.tailRotate(tail_rotate_rad);
             nm.rotateX(this.ROTATE_RAD);
        });
    }

    public animate(): void {
        requestAnimationFrame(this.animate.bind(this));

        // this.controls.update();

        this.update();
        this.gesture();
       
        // this.camera.lookAt(this.targetClone.getWorldPosition(new THREE.Vector3));
        // this.light.position.y -=1;
        // this.light.lookAt(this.targetBase.position);
        // console.log(this.targetBase);

        // this.hoge.tailRotate(Util.rad(-5));
        
        // this.hoge.setMaterial(new THREE.MeshPhongMaterial({color:0x06f0ff}));
        
        // cannon
        
        
        this.cannon.nm.setStatus(this.targetNM.getObjectStatus());
        if(this.cannon.collision){
            this.targetBase.setStatus(this.cannon.target.getObjectStatus());
        }else{
            this.cannon.target.setStatus(this.targetBase.getObjectStatus());
        }

        this.renderer.render(this.scene,this.camera);
    }

}