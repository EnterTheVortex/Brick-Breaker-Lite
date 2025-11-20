import { bricks, brick, generateBricks } from './bricks.js';
import { ball } from './ball.js';
import { spawnPowerUp } from './powerups.js';
import { score, level, completedLevels } from '../state.js';
import { resetBallAndPaddle } from './game.js';

export function detectCollisions() {
  let bricksRemaining = 0;

  for (let c = 0; c < brick.columnCount; c++) {
    for (let r = 0; r < brick.rowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        bricksRemaining++;

        if (
          ball.x > b.x &&
          ball.x < b.x + brick.width &&
          ball.y > b.y &&
          ball.y < b.y + brick.height
        ) {
          ball.dy *= -1;
          b.status = 0;
          score++;

          if (Math.random() < 0.2) {
            spawnPowerUp(b.x + brick.width / 2, b.y + brick.height / 2);
          }
        }
      }
    }
  }

  if (bricksRemaining === 0) {
    completedLevels.add(level);
    level++;
    score = 0;
    resetBallAndPaddle();
    generateBricks();
  }
}