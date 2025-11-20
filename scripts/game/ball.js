import { canvas, ctx } from './canvas.js';
import { ballLaunched, lives, isPaused } from '../state.js';
import { paddle } from './paddle.js';
import { resetBallAndPaddle } from './game.js';

export const ball = {
  x: 0,
  y: 0,
  radius: 10,
  dx: 3,
  dy: -3
};

export function drawBall() {
  const gradient = ctx.createRadialGradient(ball.x, ball.y, 2, ball.x, ball.y, ball.radius);
  gradient.addColorStop(0, "#fff");
  gradient.addColorStop(1, "#f00");

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.shadowColor = "#f00";
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.closePath();
}

export function updateBall() {
  if (!ballLaunched) {
    ball.x = paddle.x + paddle.width / 2;
    ball.y = canvas.height - paddle.height - 10 - ball.radius;
    return;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1;
  if (ball.y - ball.radius < 0) ball.dy *= -1;

  const paddleTop = canvas.height - paddle.height - 10;
  if (
    ball.y + ball.radius > paddleTop &&
    ball.y + ball.radius < paddleTop + paddle.height &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
  ) {
    ball.dy *= -1;
  }

  if (ball.y + ball.radius > canvas.height) {
    lives--;
    if (lives === 0) {
      alert("GAME OVER");
      document.location.reload();
    } else {
      resetBallAndPaddle();
    }
  }
}