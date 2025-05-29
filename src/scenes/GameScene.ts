import * as PIXI from "pixi.js";

export class GameScene extends PIXI.Container {
  private player: PIXI.Graphics;
  private playerVelocity: { x: number; y: number } = { x: 0, y: 0 };
  private onGround: boolean = false;
  private platforms: PIXI.Graphics[] = [];
  private finish: PIXI.Graphics;
  private levelComplete: boolean = false; // Add this flag

  constructor() {
    super();

    // Facebook header
    const header = new PIXI.Graphics();
    header.beginFill(0x1877f2);
    header.drawRect(0, 0, 800, 60);
    header.endFill();
    this.addChild(header);

    // Sidebar
    const sidebar = new PIXI.Graphics();
    sidebar.beginFill(0xe4e6eb);
    sidebar.drawRect(0, 60, 120, 540);
    sidebar.endFill();
    this.addChild(sidebar);

    // Platforms (posts in the feed)
    const platformData = [
      { x: 140, y: 520, w: 200, h: 20 },
      { x: 380, y: 440, w: 180, h: 20 },
      { x: 600, y: 360, w: 120, h: 20 },
      { x: 300, y: 280, w: 200, h: 20 },
      { x: 550, y: 260, w: 180, h: 20 }, // lowered from 220 to 260
    ];
    for (const plat of platformData) {
      const p = new PIXI.Graphics();
      p.beginFill(0xffffff);
      p.drawRect(plat.x, plat.y, plat.w, plat.h);
      p.endFill();
      this.platforms.push(p);
      this.addChild(p);
    }

    // Finish (Like button)
    this.finish = new PIXI.Graphics();
    this.finish.beginFill(0x42b72a);
    this.finish.drawRoundedRect(670, 120, 80, 40, 10);
    this.finish.endFill();
    const likeText = new PIXI.Text("Like", {
      fontFamily: "Arial",
      fontSize: 20,
      fill: 0xffffff,
    });
    likeText.x = 690;
    likeText.y = 130;
    this.addChild(this.finish, likeText);

    // Player
    this.player = new PIXI.Graphics();
    this.player.beginFill(0xe53935);
    this.player.drawCircle(0, 0, 20);
    this.player.endFill();
    this.player.x = 160;
    this.player.y = 500;
    this.addChild(this.player);
  }

  public movePlayer(dx: number, dy: number) {
    this.playerVelocity.x = dx;
  }

  public jumpPlayer(force: number) {
    if (this.onGround) {
      this.playerVelocity.y = force;
      this.onGround = false;
    }
  }

  public update(delta: number) {
    // Gravity
    this.playerVelocity.y += 0.5;

    // Store previous position
    const prevY = this.player.y;

    // Move player
    this.player.x += this.playerVelocity.x;
    this.player.y += this.playerVelocity.y;

    // Simple collision with platforms
    this.onGround = false;
    for (const plat of this.platforms) {
      if (this.hitTestRectangle(this.player, plat)) {
        // Only land if falling and was above the platform last frame
        const platBounds = plat.getBounds();
        if (prevY + 20 <= platBounds.y && this.playerVelocity.y >= 0) {
          this.player.y = platBounds.y - 20;
          this.playerVelocity.y = 0;
          this.onGround = true;
        }
      }
    }

    // Floor
    if (this.player.y > 580) {
      this.player.y = 580;
      this.playerVelocity.y = 0;
      this.onGround = true;
    }

    // Check for finish
    if (
      !this.levelComplete &&
      this.hitTestRectangle(this.player, this.finish)
    ) {
      this.levelComplete = true;
      alert("Level Complete! You reached the Like button!");
      window.location.reload();
    }

    // Friction
    this.playerVelocity.x *= 0.8;
  }

  private hitTestRectangle(r1: PIXI.DisplayObject, r2: PIXI.Graphics): boolean {
    const b1 = r1.getBounds();
    const b2 = r2.getBounds();
    return (
      b1.x + b1.width > b2.x &&
      b1.x < b2.x + b2.width &&
      b1.y + b1.height > b2.y &&
      b1.y < b2.y + b2.height
    );
  }
}
