import "./styles.css";
import Game from "./game";

const GAME_SCREEN = {
  height: 600,
  width: 800
};

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let game = new Game(GAME_SCREEN.width, GAME_SCREEN.height);

let lastTime = 0;
 

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_SCREEN.width, GAME_SCREEN.height);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

gameLoop();
