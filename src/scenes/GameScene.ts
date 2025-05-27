import * as PIXI from 'pixi.js';
import { Player } from '../components/Player';

export class GameScene extends PIXI.Container {
    private player: Player;

    private velocity: PIXI.Point;
    private isJumping: boolean;
    private gravity: number = 0.5;

    constructor() {
        super();
        
        // Create and position player at center
        this.player = new Player();
        this.player.x = 400;  // Center horizontally
        this.player.y = 300;  // Center vertically
        this.addChild(this.player);

        
        this.velocity = new PIXI.Point(0, 0);
        this.isJumping = false;
    }

    public movePlayer(x: number, y: number): void {
        this.player.x += x;
    }

    public jumpPlayer(force: number): void {
        if (!this.isJumping) {
            this.velocity.y = force;
            this.isJumping = true;
        }
    }

    public update(deltaTime: number): void {
        // Apply gravity
        this.velocity.y += this.gravity;
        this.player.y += this.velocity.y;

        // Simple ground collision
        if (this.player.y > 550) {
            this.player.y = 550;
            this.velocity.y = 0;
            this.isJumping = false;
        }
    }
}