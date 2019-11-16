import Paddle from "./paddle";
import Ball from "./ball"; 
import InputHandler from "./input";
import { buildLevel, level1, level2} from "./levels";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEW_LEVEL: 4
}

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth;
    this.height = gameHeight;
    this.gameState = GAME_STATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 2;
    this.levels = [level1, level2];
    this.currentLevel = 0;
    new InputHandler(this.paddle, this);
  }

  start() {    

    if (this.gameState !== GAME_STATE.MENU && this.gameState !== GAME_STATE.NEW_LEVEL ) return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);

    this.ball.reset();
    
    this.gameObjects = [this.paddle, this.ball];

    this.gameState = GAME_STATE.RUNNING;
    
  }

  update(deltaTime) {
     
    if (this.lives === 0 ) this.gameState = GAME_STATE.GAME_OVER;

    if( this.gameState === GAME_STATE.PAUSED  || this.gameState === GAME_STATE.MENU || this.gameState === GAME_STATE.GAME_OVER) return;

    if (this.bricks.length === 0) {
      this.currentLevel ++;
      this.gameState = GAME_STATE.NEW_LEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach(obj => obj.update(deltaTime));

    this.bricks = this.bricks.filter(obj => !obj.markForDeletion)
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(obj => obj.draw(ctx));

    if (this.gameState === GAME_STATE.PAUSED) {
      ctx.rect(0, 0, this.width , this.height);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.width/2, this.height/2)
    }

    if (this.gameState === GAME_STATE.MENU) {
      ctx.rect(0, 0, this.width , this.height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Press Spacebar to start", this.width/2, this.height/2)
    }

    if (this.gameState === GAME_STATE.GAME_OVER) {
      ctx.rect(0, 0, this.width , this.height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.width/2, this.height/2)
    }
  }

  togglePause() {
    if (this.gameState == GAME_STATE.PAUSED){
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }
}
