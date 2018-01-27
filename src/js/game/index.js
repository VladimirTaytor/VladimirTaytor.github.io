const path = 'src/assets/sprites/'

const config = {

  speed: 300,
  ver_speed_coof: 0.4,

  window_width: 800,
  window_height: 600,

  animations_speed: 4 /* frames per second */
}

class Game{

  constructor(){
    this.game = new Phaser.Game(
      config.window_width,
      config.winodw_height,
      Phaser.AUTO,
      'peluh_loh', { preload: this.preload, create: this.create, update: this.update });
  }

  preload(){
    //spritesheets
    this.game.load.spritesheet('pukich_backward', path + 'pukich/backward.png', 128, 128, 3);

    //textures
    this.game.load.image('background', path + '../textures/background.png');
  }

  create(){
    this.game.add.tileSprite(0, 0, 7680, 5120, 'background');
    this.player = this.game.add.sprite(100, 100, 'pukich_backward');

    this.game.world.setBounds(0, 0, 7680, 5120);
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.enable(this.player);
    this.player.body.fixedRotation = true;



    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    //sprites

    this.player.animations.add('walk');
    this.player.animations.play('walk', config.animations_speed, true);
  }

  update(){

  this.player.body.setZeroVelocity();

   if (this.cursors.up.isDown){
       this.player.body.moveUp(config.speed - config.ver_speed_coof * config.speed);
   }
   else if (this.cursors.down.isDown){
       this.player.body.moveDown(config.speed - config.ver_speed_coof * config.speed);
   }

   if (this.cursors.left.isDown){
       this.player.body.velocity.x = -config.speed;
   }
   else if (this.cursors.right.isDown){
       this.player.body.moveRight(config.speed);
   }
  }

  start(){
    console.log('fuck you');
  }
}
