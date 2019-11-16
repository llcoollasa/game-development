import { detectCollition } from './collisionDetection';

export default class Brick{
    constructor(game) {
        this.game = game;
        this.image = document.getElementById("brick");

        this.position = {
          x: 0,
          y: 0
        };

        this.size = {
          height: 20,
          width: 30
        };

        this.markForDeletion = false;
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
    
      update() {
          if(detectCollition(this.game.ball, this)) {
              this.game.ball.speed.y =  -this.game.ball.speed.y;
              this.markForDeletion = true;
          }
      }
}