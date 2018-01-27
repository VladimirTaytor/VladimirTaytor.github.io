const path = 'src/assets/sprites/'

class Game{

  constructor(){
    this.game = new Phaser.Game(
      800,
      600,
      Phaser.AUTO,
      'peluh_loh', { preload: this.preload, create: this.create, update: this.update });
  }

  preload(){
    this.game.load.spritesheet('pukich_backward', path + 'pukich/backward.png', 128, 128, 3);
  }

  create(){
    this.player = this.game.add.sprite(100, 100, 'pukich_backward');

    this.player.animations.add('walk');
    this.player.animations.play('walk', 4, true);
  }

  update(){

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        this.player.x -= 4;
    }
    else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        this.player.x += 4;
    }

    if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        this.player.y -= 4;
    }
    else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        this.player.y += 4;
    }
  }

  start(){
    console.log('fuck you');
  }
}
