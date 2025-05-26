import * as PIXI from 'pixi.js';

export class Player extends PIXI.Container {
    private ball: PIXI.Graphics;
    private leftEye: PIXI.Graphics;
    private rightEye: PIXI.Graphics;
    private velocity: PIXI.Point;

    constructor() {
        super();
        
        // Create the red ball body
        this.ball = new PIXI.Graphics();
        this.ball.beginFill(0xFF0000);     // Red color
        this.ball.drawCircle(0, 0, 20);    // Circle with radius 20
        this.ball.endFill();
        
        // Create white eyes
        this.leftEye = new PIXI.Graphics();
        this.leftEye.beginFill(0xFFFFFF);  // White color
        this.leftEye.drawCircle(-7, -5, 5); // Left eye
        this.leftEye.endFill();
        
        this.rightEye = new PIXI.Graphics();
        this.rightEye.beginFill(0xFFFFFF); // White color
        this.rightEye.drawCircle(7, -5, 5); // Right eye
        this.rightEye.endFill();
        
        // Add all parts to the container
        this.addChild(this.ball);
        this.addChild(this.leftEye);
        this.addChild(this.rightEye);
        
        // Initialize velocity for movement
        this.velocity = new PIXI.Point(0, 0);
    }

    update(delta: number) {
        // We'll add movement logic here later
        this.x += this.velocity.x * delta;
        this.y += this.velocity.y * delta;
    }
}