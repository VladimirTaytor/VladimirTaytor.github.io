class Game{

  constructor(){
    this.game = new Phaser.Game(
      800,
      600,
      Phaser.AUTO,
      'peluh_loh', { preload: this.preload, create: this.create, update: this.update });
  }

  preload(){

  }

  create(){

  }

  animationStarted(sprite, animation) {
  }

  upload(){

  }

  start(){
    console.log('fuck you');
  }
}
