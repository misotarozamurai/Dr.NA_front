import * as THREE from "three";

export default class ThreeAnimation <T extends THREE.Camera> {
    protected scene:        THREE.Scene;
    protected renderer:     THREE.WebGLRenderer;
    private _dom:           HTMLCanvasElement;
    protected camera:       T | THREE.PerspectiveCamera;
    protected animationID:  number;

    constructor(camera?: T) {
        this.scene          = new THREE.Scene();
        this.renderer       = new THREE.WebGLRenderer();
        this._dom           = this.renderer.domElement;
        this.camera         = camera ?? new THREE.PerspectiveCamera();
        this.animationID    = 0;
    }

    public get dom() {
        return this._dom;
    }

    public onResize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height); 
    }
    protected animate(): void {
        this.animationID = requestAnimationFrame(this.animate.bind(this));
        this.renderer.render(this.scene,this.camera);
    }
}