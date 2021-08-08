import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO, //automatically choose the renderer for the appliaction
  width: 800,
  height: 600,
  physics: {
    // arcade physics plugin manages physics simulation
    default: 'arcade',
    arcade:  {
      gravity: {
        y: 500
      }
    }
  },
  scene: {
    preload,
    create,
    update
  }
};
const VELOCITY = 400;
const FLAP_VELOCITY = 250;
const INITIAL_BIRD_POSITION = { 
  x: config.width * 0.1,
  y: config.height / 2,
};
let bird = null;

// loading assets such as images, music, animations..
function preload() {
  // 'this' context is scene
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

// initialzing the instances of assets
function create() {
  // x, y, key
  // setting the origin point for the image like (0 * width, 0 * height)
  // by default origin is the mid point
  this.add.image(0, 0, 'sky').setOrigin(0);

  // sprite is a game object with more properties
  bird = this.physics.add.sprite(INITIAL_BIRD_POSITION.x, INITIAL_BIRD_POSITION.y, 'bird').setOrigin(0);
  this.input.on('pointerdown', flap)
  this.input.keyboard.on('keydown_SPACE', flap)
}

//60 fps
// update will be called 60 times per second
function update() {
  if(bird.y + bird.height < 0 || bird.y > config.height) {
    resetBirdPosition();
  }
}

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY
}

function resetBirdPosition() {
  bird.x = INITIAL_BIRD_POSITION.x;
  bird.y = INITIAL_BIRD_POSITION.y;
  bird.body.velocity.y = 0;
}

new Phaser.Game(config);