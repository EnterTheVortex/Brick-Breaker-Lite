import { canvas, ctx } from './canvas.js';
import { getInputState } from './input.js';

export const paddle = {
  width: 100,
  height: 12,
  x: (canvas.width - 100) / 2,
  speed: 8
};

export function drawPaddle() {
  const y = canvas.height - paddle.height - 10;
  const gradient = ctx.createLinearGradient(paddle.x, y, paddle.x + paddle.width, y + paddle.height);
  gradient.addColorStop(0, "#00f");
  gradient.addColorStop(1, "#004");

  ctx.beginPath();
  ctx.rect(paddle.x, y, paddle.width, paddle.height);
  ctx.fillStyle = gradient;
  ctx.shadowColor = "#00f";
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.closePath();
}

export function updatePaddle() {
  const { rightPressed, leftPressed } = getInputState();
  if (rightPressed) paddle.x += paddle.speed;
  else if (leftPressed) paddle.x -= paddle.speed;

  if (paddle.x < 0) paddle.x = 0;
  if (paddle.x + paddle.width > canvas.width) paddle.x = canvas.width - paddle.width;
}