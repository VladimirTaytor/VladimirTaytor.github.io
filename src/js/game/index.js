const path = 'src/assets/sprites/'

class Game{

  constructor(){
    this.game = new Phaser.Game(
      800 /*window.innerWidth*/,
      600 /*window.innerHeight*/,
      Phaser.AUTO,
      'peluh_loh', { preload: this.preload, create: this.create, update: this.update });
  }

  preload(){
    this.game.load.spritesheet('pukich_backward', path + 'pukich/backward.png', 128, 128, 3);
  }

  create(){
    this.player = this.game.add.sprite(100, 100, 'pukich_backward');

    this.game.world.setBounds(0, 0, 7680, 5120);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.enable(this.player);
    this.player.body.fixedRotation = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    //sprites

    this.player.animations.add('walk');
    this.player.animations.play('walk', 4, true);
  }

  update(){

  this.player.body.setZeroVelocity();

   if (this.cursors.up.isDown){
       this.player.body.moveUp(300)
   }
   else if (this.cursors.down.isDown){
       this.player.body.moveDown(300);
   }

   if (this.cursors.left.isDown){
       this.player.body.velocity.x = -300;
   }
   else if (this.cursors.right.isDown){
       this.player.body.moveRight(300);
   }
  }

  start(){
    console.log('fuck you');
  }
}
