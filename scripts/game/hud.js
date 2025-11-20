import { ctx, canvas } from './canvas.js';
import { score, lives, level } from '../state.js';

export function drawHUD() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 10, 20);
  ctx.fillText("Lives: " + lives, canvas.width - 90, 20);
  ctx.fillText("Level: " + level, canvas.width / 2 - 30, 20);
}