const path    = 'src/assets/sprites/';
var in_conversation = false;
var enemies = [];
var playerr;
var gitems = [];
var picked = [false, false];
const config  = {

  cell_size: 128,

  //movement
  speed: 300,
  ver_speed_coof: 0.4,

  enemy_range: 150,

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

      MusicInterface.play(MUSIC_NAMES.IN_GAME);
  }

  preload(){
    //spritesheets
    this.game.load.spritesheet('pukich', path + 'player.png', 128, 128, 16);

    // ==== textures ====

    this.game.load.image('item', path + '../textures/item.png');
    this.game.load.image('item2', path + '../textures/item2.png');

    //road
    this.game.load.image('road:line', path + '../textures/line_road.png');
    this.game.load.image('road:rotate', path + '../textures/rotate_road.png');
    this.game.load.image('road:squad', path + '../textures/squad_road.png');
    this.game.load.image('road:triple', path + '../textures/triple_road.png');

    //fences

    this.game.load.image('f1', path + '../textures/fence1.png');

    //trees

    this.game.load.image('t1', path + '../textures/tree1.png');

    //enemies
    this.game.load.spritesheet('sobaka1', path + 'sobaka.png', 128, 128, 8);

    //buildings
    for(let i = 1; i <= 12; i++){
      this.game.load.image('b' + i, path + '../textures/buildings/b' + i + '.png');
    }
    //gates

    this.game.load.image('g1', path + '../textures/gate1.png');

    this.game.load.image('background', path + '../textures/background.png');
  }

  create(){

    let dogs_id = 1;

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.group = this.game.add.group();

    this.conversation = new Conversation;

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
    enemies = [];

    for(let i = 0; i < level.map.length; i++){
      for(let j = 0; j < level.map[0].length; j++){

        if(typeof level.map[i][j] === 'string'){
          let params = level.map[i][j].split(':');
          let rotation = 0, sp_name, anchor = {x: 0.5, y: 0.5};

          if(params[0] == 'r'){
            if(params[1] == 'l'){
              sp_name = 'road:line';
              rotation = params[2];
            }else if(params[1] == 'r'){
              sp_name = 'road:rotate';
              rotation = params[2];
            }
            else if(params[1] == 't'){
              sp_name = 'road:triple';
              rotation = params[2];
            }else if(params[1] == 's'){
              sp_name = 'road:squad';
            }

            let p = this.game.add.image(j * config.cell_size + 64, i * config.cell_size + 64, sp_name);
            p.anchor.setTo(anchor.x, anchor.y);
            p.angle += rotation;

          }else if(params[0] == 'b'){

            let p = this.game.add.image(j * config.cell_size + 64, i * config.cell_size + 128, params[1]);
            p.anchor.setTo(0.25, 1);

            this.buildings.push(p);
            this.group.add(p);
          }
          else if(params[0] == 'g1'){
            let p = this.game.add.image(j * config.cell_size + 64, i * config.cell_size + 128, params[0]);
            p.anchor.setTo(0.25, 1);

            this.buildings.push(p);
            this.group.add(p);
          }else if(params[0] == 't1' || params[0] == 'f1'){
            let p = this.game.add.image(j * config.cell_size + 64, i * config.cell_size + 128, params[0]);
            p.anchor.setTo(0.5, 1);

            let rand = Math.round(Math.random(1));

            if(rand){
              p.scale.x *= -1;
            }

            this.buildings.push(p);
            this.group.add(p);
          }
        }
      }
    }

    console.log(level.enemies);

    for(let i = 0; i < level.enemies.length; i++){

      console.log('add enemy');

      let enemy_raw = level.enemies[i];

      let enemy = this.game.add.sprite(enemy_raw.trajectory[0] * config.cell_size + 64, enemy_raw.trajectory[1] * config.cell_size + 64, enemy_raw.name);

      enemy.anchor.setTo(0.5, 0.5);

      enemy.animations.add('move', [0,1,2,3,4,5,6,7], 1, true);
      enemy.play('move', config.animations_speed, true);
      enemy.unique_id = dogs_id;
      dogs_id++;

      enemies.push(enemy);
      this.group.add(enemy);
    }

    //======= text label

    this.bar = this.game.add.graphics();
    this.bar.beginFill(0x000000, 0.2);
    this.bar.drawRect(0, 500, 800, 100);

    var style = { font: "32px Righteous", fill: "white" , align: 'center'};

    this.text = this.game.add.text(0, 0, "Press f to pick up", style);
    this.text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    this.text.setTextBounds(0, 500, 800, 100);
    this.bar.fixedToCamera = true;
    this.text.fixedToCamera = true;
    this.bar.visible = false;
    this.text.visible = false;



    //=====

    playerr = this.game.add.sprite(100, 300, 'pukich');
    this.group.add(playerr);

    gitems = [];

    gitems.push(this.game.add.sprite(1860, 580, 'item'));
    gitems.push(this.game.add.sprite(828, 180, 'item2'));

    this.game.world.setBounds(0, 0, 3840, 1920);
    this.game.physics.p2.enable(playerr);

    this.keyf = this.game.input.keyboard.addKey(Phaser.Keyboard.F);

    playerr.body.fixedRotation = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();
    playerr.anchor.set(0.5, 1);

    this.group.sort();

    this.game.camera.follow(playerr, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    //sprites

    playerr.animations.add('left', [0,1,2,3], 1, true);
    playerr.animations.add('backward', [4,5,6,7], 1, true);
    playerr.animations.add('right', [8, 9, 10, 11], 1, true);
    playerr.animations.add('forward', [12, 13, 14, 15], 1, true);

    playerr.animations.play('left', config.animations_speed, true);

    // fullscreen
    this.game.input.onDown.add(goFull.bind(this), this.game);
  }


  update(){

    if(!in_conversation){

      if(enemies.length == 0 && Math.floor(playerr.y / 128) == 9 && Math.floor(playerr.x / 128) == 29){
        let finish_time = new Date();
        let points = finish_time - start_time / 10000;
        document.getElementById('points').innerHTML = `${Math.round(points / 100000000)} points`;
        document.getElementsByTagName('canvas')[0].style.display = 'none';
        document.getElementById('congratulations-screen').style.display = 'block';
        in_conversation = true;
      }

      playerr.body.setZeroVelocity();

      let animation_changed = false;

      let move = true;

      for(let i = 0; i < enemies.length; i++){

        let enemy = enemies[i];

        if(Math.sqrt(Math.pow(playerr.x - enemy.x, 2) + Math.pow(playerr.y - enemy.y, 2)) <= config.enemy_range){
          in_conversation = true;

          if(enemy.unique_id == 2){
            this.conversation.startConversation1(enemy.unique_id);
          }else if(enemy.unique_id == 1){
            this.conversation.startConversation2(enemy.unique_id);
          }else if(enemy.unique_id == 3){
            this.conversation.startConversation3(enemy.unique_id);
          }

          move = false;
        }
      }

      if(move){
        if(this.cursors.left.isDown && this.mov_map[Math.floor((playerr.y) / 128)][Math.floor((playerr.x - 25) / 128)] != 0){
          animation_changed = true;
          playerr.animations.play('left', config.animations_speed, false);
          playerr.body.velocity.x = -config.speed;
        }
        else if (this.cursors.right.isDown && this.mov_map[Math.floor((playerr.y) / 128)][Math.floor((playerr.x + 25) / 128)] != 0){
          animation_changed = true
          playerr.animations.play('right', config.animations_speed, false);
          playerr.body.moveRight(config.speed);
        }

        if (this.cursors.up.isDown && this.mov_map[Math.floor((playerr.y - 20) / 128)][Math.floor((playerr.x) / 128)] != 0){
          if(!animation_changed) playerr.animations.play('backward', config.animations_speed, false);
          playerr.body.moveUp(config.speed - config.ver_speed_coof * config.speed);
        }
        else if (this.cursors.down.isDown && this.mov_map[Math.floor((playerr.y + 10) / 128)][Math.floor((playerr.x) / 128)] != 0){
          if(!animation_changed) playerr.animations.play('forward', config.animations_speed, false);
          playerr.body.moveDown(config.speed - config.ver_speed_coof * config.speed);
        }
      }

      var boundsA = playerr.getBounds();

      for(let i = 0; i < this.buildings.length; i++){

        var boundsB = this.buildings[i].getBounds();

        if(Phaser.Rectangle.intersects(boundsA, boundsB) && playerr.y < this.buildings[i].y){
          this.buildings[i].alpha = 0.65;
          this.buildings[i].transparented = true;
        }else if(this.buildings[i].transparented){
          this.buildings[i].alpha = 1;
        }
      }

      for(let i = 0; i < gitems.length; i++){
        let item = gitems[i];

        if(item && !picked[i]){
          var boundsC = item.getBounds();
          if(Phaser.Rectangle.intersects(boundsA, boundsC)){
            this.bar.visible = true;
            this.text.visible = true;

            if(this.keyf.isDown){
              if(i == 0){
                items.pizza = true;
              }else if(i == 1){
                items.snake = true;
              }
              item.kill();
              gitems.splice(i, 1);
              picked[i] = true;
              picked.splice(i, 1);
              this.bar.visible = false;
              this.text.visible = false;
            }
          }else{
            this.bar.visible = false;
            this.text.visible = false;
          }
        }
      }

      this.game.world.bringToTop(this.group);

      this.group.sort('y', Phaser.Group.SORT_ASCENDING);
    }
  }

  destroyDog(id){
    console.log(id);
    for(let i = 0; i < enemies.length; i++){
      if(enemies[i].unique_id == id){
        enemies[i].kill();
        enemies.splice(i, 1);
        in_conversation = false;
      }
    }
  }

  backToStart(){
    playerr.reset(100, 300);
    in_conversation = false;
  }

  start(){
    console.log('fuck you');
  }
}
