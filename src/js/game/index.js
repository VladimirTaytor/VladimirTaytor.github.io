const path    = 'src/assets/sprites/';
const config  = {

  cell_size: 128,

  //movement
  speed: 300,
  ver_speed_coof: 0.4,

  window_width: 800,
  window_height: 600,

  animations_speed: 9 /* frames per second */
}

class Game{

  constructor(){
    this.world = [];
    this.map = [];
    this.mov_map = [];
    this.transparented = [];

    this.game = new Phaser.Game(
      config.window_width,
      config.winodw_height,
      Phaser.AUTO,
      'peluh_loh', { preload: this.preload, create: this.create, update: this.update });
  }

  preload(){
    //spritesheets
    this.game.load.spritesheet('pukich', path + 'player.png', 128, 128, 16);

    // ==== textures ====

    //road
    this.game.load.image('road:line', path + '../textures/line_road.png');
    this.game.load.image('road:rotate', path + '../textures/rotate_road.png');
    this.game.load.image('road:squad', path + '../textures/squad_road.png');
    this.game.load.image('road:triple', path + '../textures/triple_road.png');

    //buildings
    this.game.load.image('b1', path + '../textures/buildings/b1.png');
    this.game.load.image('b2', path + '../textures/buildings/b2.png');

    this.game.load.image('background', path + '../textures/background.png');
  }

  create(){

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.group = this.game.add.group();

    this.playerCollisionGroup = this.physics.p2.createCollisionGroup();
    this.buildingsCollisionGroup = this.physics.p2.createCollisionGroup();

    this.game.add.tileSprite(0, 0, 7680, 5120, 'background');

    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    let level = first_level;
    this.map = level.map;
    this.mov_map = level.mov_map;
    let cells_around = [[0,1], [-1,0], [1,0], [0,-1]];

    let checkBorders = function(x,z){
      return x >= 0 && z >= 0 && x < level.map[0].length && z < level.map.length;
    };

    let goFull = function() {
          if (this.game.scale.isFullScreen) {
              this.game.scale.stopFullScreen();
          } else {
              this.game.scale.startFullScreen(false);
          }
      };

    this.game.world.setBounds(0, 0, 7680, 5120);
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.buildings = [];

    for(let i = 0; i < level.map.length; i++){
      for(let j = 0; j < level.map[0].length; j++){

        if(typeof level.map[i][j] === 'string'){
          let params = level.map[i][j].split(':');
          let rotation = 0, sp_name, anchor = {x: 0.5, y: 0.5};

          if(params[0] == 'r'){
            if(params[1] == 'l'){
              sp_name = 'road:line';
            }else if(params[1] == 'r'){
              sp_name = 'road:rotate';
            }
            rotation = params[2];

            let p = this.game.add.image(j * config.cell_size + 64, i * config.cell_size + 64, sp_name);
            p.anchor.setTo(anchor.x, anchor.y);
            p.angle += rotation;

          }else if(params[0] == 'b'){

            let p = this.game.add.image(j * config.cell_size + 64, i * config.cell_size + 128, params[1]);
            p.anchor.setTo(0.25, 1);

            this.buildings.push(p);
            this.group.add(p);
          }
        }
      }
    }

    this.player = this.game.add.sprite(100, 200, 'pukich');
    this.group.add(this.player);

    this.game.world.setBounds(0, 0, 7680, 5120);
    this.game.physics.p2.enable(this.player);

    this.player.body.fixedRotation = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.player.anchor.set(0.5, 1);

    this.group.sort();

    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    //sprites

    this.player.animations.add('left', [0,1,2,3], 1, true);
    this.player.animations.add('backward', [4,5,6,7], 1, true);
    this.player.animations.add('right', [8, 9, 10, 11], 1, true);
    this.player.animations.add('forward', [12, 13, 14, 15], 1, true);

    this.player.animations.play('left', config.animations_speed, true);

    // fullscreen
    this.game.input.onDown.add(goFull.bind(this), this.game);
  }


  update(){

    this.player.body.setZeroVelocity();

    let animation_changed = false;

    if(this.cursors.left.isDown && this.mov_map[Math.floor((this.player.y) / 128)][Math.floor((this.player.x - 25) / 128)] != 0){
      animation_changed = true;
      this.player.animations.play('left', config.animations_speed, false);
      this.player.body.velocity.x = -config.speed;
    }
    else if (this.cursors.right.isDown && this.mov_map[Math.floor((this.player.y) / 128)][Math.floor((this.player.x + 25) / 128)] != 0){
      animation_changed = true
      this.player.animations.play('right', config.animations_speed, false);
      this.player.body.moveRight(config.speed);
    }

    if (this.cursors.up.isDown && this.mov_map[Math.floor((this.player.y - 20) / 128)][Math.floor((this.player.x) / 128)] != 0){
      if(!animation_changed) this.player.animations.play('backward', config.animations_speed, false);
      this.player.body.moveUp(config.speed - config.ver_speed_coof * config.speed);
    }
    else if (this.cursors.down.isDown && this.mov_map[Math.floor((this.player.y + 10) / 128)][Math.floor((this.player.x) / 128)] != 0){
      if(!animation_changed) this.player.animations.play('forward', config.animations_speed, false);
      this.player.body.moveDown(config.speed - config.ver_speed_coof * config.speed);
    }

    var boundsA = this.player.getBounds();

    for(let i = 0; i < this.buildings.length; i++){

      var boundsB = this.buildings[i].getBounds();

      if(Phaser.Rectangle.intersects(boundsA, boundsB) && this.player.y < this.buildings[i].y){
        this.buildings[i].alpha = 0.65;
        this.buildings[i].transparented = true;
      }else if(this.buildings[i].transparented){
        this.buildings[i].alpha = 1;
      }
    }

    this.game.world.bringToTop(this.group);

    this.group.sort('y', Phaser.Group.SORT_ASCENDING);
  }

  start(){
    console.log('fuck you');
  }
}
