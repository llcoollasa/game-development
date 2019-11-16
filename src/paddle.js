export default class Paddle {
  constructor(game) {
    this.game = game;
    this.size = {
      width: 100,
      height: 10
    };

    this.position = {
      x: this.game.width / 2 - this.size.width / 2,
      y: this.game.height - this.size.height - 10
    };

    this.maxSpeed = 10;
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.size.width > this.game.width)
      this.position.x = this.game.width - this.size.width;
  }

  stop() {
    this.speed = 0;
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = +this.maxSpeed;
  }
}
