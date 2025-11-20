import { ctx, canvas } from './canvas.js';
import { paddle } from './paddle.js';
import { ball } from './ball.js';
import { lives } from '../state.js';

export let powerUps = [];
const powerUpTypes = ["wide", "slow", "life"];
let wideActive = false;

export function spawnPowerUp(x, y) {
  const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
  powerUps.push({ x, y, radius: 10, type, dy: 1 });
}

export function drawPowerUps() {
  powerUps.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.type === "wide" ? "#0ff" : p.type === "slow" ? "#ff0" : "#f0f";
    ctx.fill();
    ctx.closePath();
  });
}

export function updatePowerUps() {
  powerUps.forEach((p, i) => {
    p.y += p.dy;
    const paddleTop = canvas.height - paddle.height - 10;
    if (
      p.y + p.radius > paddleTop &&
      p.y < paddleTop + paddle.height &&
      p.x > paddle.x &&
      p.x < paddle.x + paddle.width
    ) {
      applyPowerUp(p.type);
      powerUps.splice(i, 1);
    } else if (p.y > canvas.height) {
      powerUps.splice(i, 1);
    }
  });
}

function applyPowerUp(type) {
  if (type === "wide" && !wideActive) {
    wideActive = true;
    paddle.width = 150;
    setTimeout(() => {
      paddle.width = 100;
      wideActive = false;
    }, 10000);
  } else if (type === "slow") {
    ball.dx *= 0.6;
    ball.dy *= 0.6;
    setTimeout(() => {
      ball.dx = ball.dx < 0 ? -3 : 3;
      ball.dy = ball.dy < 0 ? -3 : 3;
    }, 10000);
  } else if (type === "life") {
    lives++;
  }
}