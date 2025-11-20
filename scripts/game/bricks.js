import { ctx } from './canvas.js';
import { level } from '../state.js';

export const brick = {
  rowCount: 6,
  columnCount: 10,
  width: 65,
  height: 25,
  padding: 10,
  offsetTop: 40,
  offsetLeft: 35
};

export let bricks = [];

const levels = [
  Array.from({ length: 6 }, () => Array(10).fill(1)),
  Array.from({ length: 6 }, (_, r) => Array.from({ length: 10 }, (_, c) => (r + c) % 2)),
  [
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,0,0],
    [0,0,1,1,1,1,1,0,0,0],
    [0,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,1,1,1,1,1]
  ]
];

export function generateBricks() {
  bricks = [];
  const pattern = levels[level - 1] || null;

  for (let c = 0; c < brick.columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brick.rowCount; r++) {
      const status = pattern ? (pattern[r]?.[c] ?? 0) : (Math.random() < 0.7 ? 1 : 0);
      bricks[c][r] = { x: 0, y: 0, status };
    }
  }
}

export function drawBricks() {
  for (let c = 0; c < brick.columnCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brick.width + brick.padding) + brick.offsetLeft;
        const brickY = r * (brick.height + brick.padding) + brick.offsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;

        const gradient = ctx.createLinearGradient(brickX, brickY, brickX + brick.width, brickY + brick.height);
        gradient.addColorStop(0, "#0f0");
        gradient.addColorStop(1, "#030");

        ctx.beginPath();
        ctx.rect(brickX, brickY, brick.width, brick.height);
        ctx.fillStyle = gradient;
        ctx.shadowColor = "#0f0";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#060";
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}