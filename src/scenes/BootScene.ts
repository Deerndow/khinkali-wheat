import Phaser from 'phaser';

// Loads assets, then hands off to GameScene.
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    // Put files in public/assets/ and load them here, e.g.:
    // this.load.image('player', 'assets/player.png');
    // this.load.tilemapTiledJSON('level1', 'assets/level1.json');
  }

  create() {
    this.scene.start('Game');
  }
}
