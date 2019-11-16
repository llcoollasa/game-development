import { detectCollition } from './collisionDetection';

export default class Ball {
  constructor(game) {
    this.game = game;
    this.image = document.getElementById("ball");    

    this.size = {
      height: 24,
      width: 24
    };

    this.reset();
  }

  reset() {
    this.position = {
      x: 10,
      y: 10
    };
    this.speed = {
      x: 5,
      y: 5
    };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (
      this.position.x + this.size.width > this.game.width ||
      this.position.x < 0
    ) {
      this.speed.x = -this.speed.x;
    }

    if (
      this.position.y < 0
    ) {
      this.speed.y = -this.speed.y;
    }

    if (this.position.y + this.size.width > this.game.height) {
      this.game.lives -= 1;
      this.reset();
    }

    if (detectCollition(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size.height;
    }
  }
}
