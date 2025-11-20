import { ctx, canvas } from './canvas.js';
import { isPaused } from '../state.js';
import { drawBricks } from './bricks.js';
import { drawPaddle, updatePaddle } from './paddle.js';
import { drawBall, updateBall } from './ball.js';
import { drawPowerUps, updatePowerUps } from './powerups.js';
import { detectCollisions } from './collision.js';
import { drawHUD } from './hud.js';

export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawBall();
  drawPowerUps();
  drawHUD();

  if (!isPaused) {
    updatePaddle();
    updateBall();
    updatePowerUps();
    detectCollisions();
  }

  requestAnimationFrame(draw);
}