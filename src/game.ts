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

        this.gameScene = new GameScene();
        this.app.stage.addChild(this.gameScene);
    }
}

window.onload = () => {
    new Game();
};