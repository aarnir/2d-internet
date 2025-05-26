import * as PIXI from 'pixi.js';
import { GameScene } from './scenes/GameScene';

export class Game {
    private app: PIXI.Application;
    private gameScene: GameScene;

    constructor() {
        this.app = new PIXI.Application({
            width: 800,
            height: 600,
            backgroundColor: 0x1099bb
        });
        document.body.appendChild(this.app.view as HTMLCanvasElement);

        // Create and add game scene
        this.gameScene = new GameScene();
        this.app.stage.addChild(this.gameScene);

        // Set up game loop
        this.app.ticker.add((delta) => {
            this.gameScene.update(delta);
        });
    }
}

window.onload = () => {
    new Game();
};