import * as PIXI from 'pixi.js';

export class Player extends PIXI.Container {
    private ball: PIXI.Graphics;
    private leftEye: PIXI.Graphics;
    private rightEye: PIXI.Graphics;
    private velocity: PIXI.Point;

    constructor() {
        super();
        
        // Create main ball
        this.ball = new PIXI.Graphics();
        this.ball.beginFill(0xFF0000); // Red color
        this.ball.drawCircle(0, 0, 20); // radius 20
        this.ball.endFill();
        
        // Create eyes
        this.leftEye = new PIXI.Graphics();
        this.leftEye.beginFill(0xFFFFFF);
        this.leftEye.drawCircle(-7, -5, 5);
        this.leftEye.endFill();
        
        this.rightEye = new PIXI.Graphics();
        this.rightEye.beginFill(0xFFFFFF);
        this.rightEye.drawCircle(7, -5, 5);
        this.rightEye.endFill();
        
        // Add parts to container
        this.addChild(this.ball);
        this.addChild(this.leftEye);
        this.addChild(this.rightEye);
        
        // Initialize velocity
        this.velocity = new PIXI.Point(0, 0);
    }

    update(delta: number) {
        // We'll add movement logic here later
        this.x += this.velocity.x * delta;
        this.y += this.velocity.y * delta;
    }
}