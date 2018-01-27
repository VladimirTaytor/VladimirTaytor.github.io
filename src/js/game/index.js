const path = 'src/assets/sprites/'

class Game{

  constructor(){
    this.game = new Phaser.Game(
      800,
      600,
      Phaser.AUTO,
      'peluh_loh', { preload: this.preload, create: this.create });
  }

  preload(){
    this.game.load.spritesheet('pukich_forward', path + 'pukich/forward.png', 128, 128, 3);
  }

  create(){
    this.player = this.game.add.sprite(100, 100, 'pukich_backward');

    this.player.animations.add('walk');
    this.player.animations.play('walk', 4, false);
  }

  start(){
    console.log('fuck you');
  }
}
