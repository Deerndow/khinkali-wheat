import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config';

const SPEED = 250;

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Image;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { up: Phaser.Input.Keyboard.Key; down: Phaser.Input.Keyboard.Key; left: Phaser.Input.Keyboard.Key; right: Phaser.Input.Keyboard.Key };

  constructor() {
    super('Game');
  }

  create() {
    // Placeholder player: a generated square texture, replace with a real sprite later.
    this.add.graphics().fillStyle(0x4ecca3).fillRect(0, 0, 32, 32).generateTexture('player', 32, 32).destroy();

    this.player = this.physics.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'player');
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasd = this.input.keyboard!.addKeys({ up: 'W', down: 'S', left: 'A', right: 'D' }) as typeof this.wasd;

    this.add
      .text(GAME_WIDTH / 2, 24, 'Arrow keys / WASD to move', { fontFamily: 'monospace', fontSize: '18px', color: '#ffffff' })
      .setOrigin(0.5);
  }

  update() {
    const left = this.cursors.left.isDown || this.wasd.left.isDown;
    const right = this.cursors.right.isDown || this.wasd.right.isDown;
    const up = this.cursors.up.isDown || this.wasd.up.isDown;
    const down = this.cursors.down.isDown || this.wasd.down.isDown;

    const vx = (right ? 1 : 0) - (left ? 1 : 0);
    const vy = (down ? 1 : 0) - (up ? 1 : 0);

    this.player.setVelocity(vx * SPEED, vy * SPEED);
    if (vx !== 0 && vy !== 0) this.player.body!.velocity.normalize().scale(SPEED);
  }
}
