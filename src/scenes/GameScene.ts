import * as PIXI from 'pixi.js';
import { Player } from '../components/Player';

export class GameScene extends PIXI.Container {
    private player: Player;

    constructor() {
        super();
        
        // Create player
        this.player = new Player();
        this.player.x = 400; // Center horizontally
        this.player.y = 300; // Center vertically
        this.addChild(this.player);
    }

    update(delta: number) {
        this.player.update(delta);
    }
}