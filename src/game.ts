import * as PIXI from 'pixi.js';
import { GameScene } from './scenes/GameScene';

export class Game {
    private app: PIXI.Application;
    private gameScene: GameScene;
    private keys: { [key: string]: boolean } = {};

    constructor() {
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb
        });
        document.body.appendChild(this.app.view as HTMLCanvasElement);

        this.gameScene = new GameScene();
        this.app.stage.addChild(this.gameScene);

        // Setup input handlers
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));

        // Start the game loop
        this.app.ticker.add(this.update.bind(this));
    }

    private onKeyDown(event: KeyboardEvent): void {
        this.keys[event.key] = true;
    }

    private onKeyUp(event: KeyboardEvent): void {
        this.keys[event.key] = false;
    }

   private update(deltaTime: number): void {
        const moveSpeed = 5;
        const jumpForce = -10;

        // Move left with 'ArrowLeft' or 'a'
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.gameScene.movePlayer(-moveSpeed, 0);
        }
        // Move right with 'ArrowRight' or 'd'
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.gameScene.movePlayer(moveSpeed, 0);
        }
        // Jump with 'Space' or 'ArrowUp'
        if (this.keys[' '] || this.keys['ArrowUp']) {
            this.gameScene.jumpPlayer(jumpForce);
        }

        // Update the game scene
        this.gameScene.update(deltaTime);
    }
}

window.onload = () => {
    new Game();
};